# A quickstart codebase for creating Docker based services with Node.js, Express, MongoDB and TypeScript

Sreamlines developent in that you are able to edit code on the Docker host and because of development mode having a mapped volume to the src directory those changes will also be present on the running container.

## Getting Started

From the root directory run
```
source ./docker-scripts/build.sh dev
```

With the dev argument present as above the container will be watching changes and running the Typescript code directly. 

If the dev argument is omitted a production build will be constructed resulting in an empty <b>src</b> directory on the running container and the <b>dist</b> directory containing the javascript produced with the <b>tsc</b> command during the build.