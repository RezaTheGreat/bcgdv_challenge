import bodyParser from 'koa-bodyparser';
import koa from 'koa';
import { serverPort } from '../config';
import { handleRequest } from './handler';

export const app = new koa();

app.use(bodyParser());
app.use(handleRequest);

export function startServer() {
  return app.listen(serverPort, () => {
    console.info(`server started on port ${serverPort}`);
  });
}
