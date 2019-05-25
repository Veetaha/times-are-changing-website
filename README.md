# ts-nestjs-angular-template fullstack project

[Click here to open the deployed app](https://tnat.herokuapp.com/)

[![Build Status](https://travis-ci.com/Veetaha/ts-nestjs-angular-template.svg?branch=master)](https://travis-ci.com/Veetaha/ts-nestjs-angular-template) 
[![Coverage Status](https://coveralls.io/repos/github/Veetaha/ts-nestjs-angular-template/badge.svg?branch=master)](https://coveralls.io/github/Veetaha/ts-nestjs-angular-template?branch=master)

## Development stack

* [`TypeScript 3.4+`](https://www.typescriptlang.org/)
* [`NestJS 6+`](https://nestjs.com/)
* [`Angular 7+`](https://angular.io/)
* [`type-graphql`](https://typegraphql.ml/)
* [`typeorm (PostgreSQL)`](https://typeorm.io/#/)
* [`docker`](https://docs.docker.com/install/)
* [`docker-compose`](https://docs.docker.com/compose/install/)
* [`Travis CI`](https://travis-ci.com/)

## Startup

In order to configure the database connection, server port and auth token expiration time, 
create `'.env'` file that must contain the same variables as in `'example.env'`.

### Development

**Run:**
Before running the container you have to install `npm` dependencies, because all
the project directory will be mounted into the container working directory.

```bash
npm i
npm run backend:dev
```
This command creates `tnat-web-debug` image and runs it as a docker container that 
represents the backend side of your app. 

The server will listen for a debugging client on port `9229`. 
See [FAQ](#vscode-debug-with-docker) if you use `VSCode` for debugging.

The backend app will automatically restart on changes in the source code thanks to `ts-node-dev` hot reloading.

### Production

**Run:**
```bash
npm run docker
```
This command creates `tnat-web` image and runs it as a docker container with minimum overhead.

### Tests

There is `'.travis.yml'` config file for continuous integration.

**Run:**
```bash
npm run test
```

## FAQ

### VSCode debug with docker

When debugging with `VSCode` be sure that `localRoot` and `remoteRoot` config
options have the same value. Thus, docker container working directory path must match
your local project path when you are debugging your app. That's why we have separate `"debug.docker-compose.yml"` and `"debug.dockerfile"`.

```json
{
    "type":       "node",
    "request":    "attach",
    "name":       "Attach",
    "protocol":   "inspector",
    "localRoot":  "${workspaceFolder}",
    "remoteRoot": "${workspaceFolder}"
}
```
---

### `Error: getaddrinfo EAI_AGAIN`
This error may happen when you run the application in docker container and you try to resolve some hostname via `DNS` (e.g. when connecting to the database). Try [this solution](https://development.robinwinslow.uk/2016/06/23/fix-docker-networking-dns/), `"The permanent system-wide fix"` has helped me out.

---

### `'typeorm'` entity lacks primary columns in `afterRemove()` subscriber

More info [at this issue](https://github.com/typeorm/typeorm/issues/4058), as a workaround use `event.entityId` object to get primary columns.

---

### Docker doesn't allocate tty when running `docker-compose up`

`docker-compose up` command ignores `tty: true` option in `docker-compose.yml` file.
Use `docker-compose run --rm --service-ports <service_name>` in order to get
tty allocated.

---

### `npm install` fails with Node.js v12

The blame goes to `'generate-rsa-keypair'`, you may watch the issue [here](https://github.com/LinusU/node-generate-rsa-keypair/issues/5).

---

### Error with `'node-sass'` platform support when running `npm install`

This is the problem with `NodeJS v12` just downgrade to `11.13.10`

```bash
nvm use 11.13.0
```

---

### `'madge'` doesn't work when invoking it from `'backend'/'frontend'` project parent directory.

TODO file a bug. As a workaround change directory into `'backend'/'frontend'` before using `madge`.

---

### Apollo client `Query` doesn't get its dependencies injected.

It is `Angular 7` bug. As a workaround set `"target": "es5"` in your `"frontend/tsconfig.json"`.

[Link to the github issue.](https://github.com/dotansimha/graphql-code-generator/issues/1617)

---

### `'Cannot instantiate cyclic dependency! ErrorHandler ("[ERROR ->]")'`

Use angular `Injector` in order to get dependencies into your custom `ErrorHandler`.
See [this article](https://medium.com/@amcdnl/global-error-handling-with-angular2-6b992bdfb59c)
for details.

---

### `ngxsOnInit()` in not called

This is an issue with `@ngxs/store-plugin@3.4`, as a workaround don't use it or
downgrade all `@ngxs/*` libs to `3.3` version.
See [this issue](https://github.com/ngxs/store/issues/917) for details.

---

### Ngxs `dispatch()` doesn't dispatch an action that `extends Error`

TODO investigate.
As a workaround, don't derive your action from `Error`, but save the error in
your action property.

---

### `ERROR in Cannot read property 'loadChildren' of undefined`

Your routing module is a target for static analysis, thus must not have function 
for creating `Routes`. See [this discussion](https://www.bountysource.com/issues/52474675-angular-5-upgrade-can-t-get-lazy-loading-to-work).

---

### Teradata Covalent ported flexbox layout doesn't work
Don't forget to `@include covalent-layout()` mixin in your scss.

---

### MatSnackBarRef dismiss() method is not working
You need to run this method inside of `NgZone`
```ts
this.zone.run(() => this.snackBarRef.dismiss());
```