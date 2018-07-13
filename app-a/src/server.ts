import App from "./app";
import * as mongoose from "mongoose";

let retries = 0;

mongoose.connection.once('open', function() {
    console.log('Connected to MongoDB');
    const app = new App();
    app.expressApp.listen(process.env.PORT, () => {
        console.log('Express server listening on port ' + process.env.PORT);
    })
});

mongoose.connection.on('error', function (err: any) {
    // if (err.message && err.message.match(/failed to connect to server .* on first connect/)) {
    if (err && err instanceof mongoose.mongo.MongoError) {
        console.log("Failed to connect to MongoDB");
        // console.log('err: ' + err);
        retries++;
        setTimeout(function () {
            console.log(`Connection Retrying ... ${retries}`);
            mongoose.connection.openUri(process.env.MONGODB_URI || '').catch(() => {});
        }, 5 * 1000);
    } else {
        console.error(new Date(), String(err));
    }
});

mongoose.connect(process.env.MONGODB_URI);
