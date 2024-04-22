import config from './src/config/config'
import server from './src/frameworks/server/server';
import expressConfig from './src/frameworks/server/express';
import mongooseConfig from './src/frameworks/database/Mongoose';
import RouterConfig from './src/frameworks/server/router';
const app = server(config)
expressConfig(app)
mongooseConfig(config)
RouterConfig(app)
export default app
