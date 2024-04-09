/** export { client, foo as fooClient } from "./foo.client.js" */ export const { client, foo: fooClient } = Object.create(null);
export { server, foo as fooServer } from "./foo.server.js";
