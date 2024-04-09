export { client, foo as fooClient } from "./foo.client.js";
/** export { server, foo as fooServer } from "./foo.server.js" */ export const { server, foo: fooServer } = Object.create(null);
