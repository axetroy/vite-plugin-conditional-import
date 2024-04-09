import * as fooClient from "./foo.client";
import * as fooServer from "./foo.server";

const foo = import.meta.env.IS_CLIENT ? fooClient : fooServer;

foo.hello();
