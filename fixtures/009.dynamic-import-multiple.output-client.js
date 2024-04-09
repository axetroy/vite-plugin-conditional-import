const fooClient = import("./foo.client.js");
const fooServer = /** import("./foo.server.js") */ Promise.resolve(Object.create(null));
