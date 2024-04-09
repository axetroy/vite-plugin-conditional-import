/** import { client, foo as fooClient } from "./foo.client.js" */ const { client, foo: fooClient } = Object.create(null);
import { server, foo as fooServer } from "./foo.server.js";
