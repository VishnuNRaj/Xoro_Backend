import config from './src/config/config'
import server from './src/frameworks/server/server';
import expressConfig from './src/frameworks/server/express';
import mongooseConfig from './src/frameworks/database/Mongoose';
import RouterConfig from './src/frameworks/server/router';
import { createServerResponse } from './src/frameworks/server/interface';
import wss from './src/frameworks/server/websocket'
import { initializeSocketServer } from './src/frameworks/server/socket';
export const {
    app,
    httpServer,
}: createServerResponse = server(config)
initializeSocketServer(httpServer);
expressConfig(app)
mongooseConfig(config)
RouterConfig(app)

