import { client, foo as fooClient } from "./foo.client.js";
/** import { server, foo as fooServer } from "./foo.server.js" */ const { server, foo: fooServer } = Object.create(null);
