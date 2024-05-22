import express, { Application } from 'express';
import { createServer, Server as HttpServer } from 'http';
import { initializeSocketServer } from './socket';
import { createServerResponse } from './interface'
import webSocket from './websocket'
function server(config: any): createServerResponse {
  const app: Application = express();
  const httpServer: HttpServer = createServer(app);

  httpServer.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`) ;
  });
  webSocket(httpServer)

  return <createServerResponse>{ app, httpServer };
}

export default server;
