import express from "./app";
import * as mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URI, (err) => {
    if (err && err instanceof mongoose.mongo.MongoError) {
        console.log('err: ' + err);
        
        setTimeout(function () {
            console.log("Retrying first connect...");
            mongoose.connection.openUri(process.env.MONGODB_URI || '').catch(() => {});
        }, 5 * 1000);
    }
});

mongoose.connection.once('open', function() {
    console.log('Connected to MongoDb');
    express.listen(process.env.PORT, () => {
        console.log('Express server listening on port ' + process.env.PORT);
    })
});
