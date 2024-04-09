const fooClient = /** import("./foo.client.js") */ Promise.resolve(Object.create(null));
const fooServer = import("./foo.server.js");
