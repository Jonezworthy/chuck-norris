import dotenv = require('dotenv');
const env: any = dotenv.config({ path: __dirname + '/.env' }).parsed;

import Server from './controllers/server.c';

(async () => {
    const app = new Server(env || process.env);
    await app.establishDB();
    await app.setupRoutes();
})();