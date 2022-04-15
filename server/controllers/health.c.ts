import { Controller } from '../interfaces/controller.i';
import { Response } from '../interfaces/response.i';
import AutoLoad from './autoload.c';
import { default as CommonResponses } from '../utils/responses';
import Server from './server.c';
import { Process } from '../interfaces/process.i';
import fs from 'fs';
import path from 'path';

declare var process: Process;

export default class Health extends AutoLoad implements Controller {

    public async get(): Promise<Response> {
        return CommonResponses('ok', { connected: !!process.db });
    }
    public async post(payload: { password: string }): Promise<Response> {
        const connectionString = 'mongodb+srv://thrive:' + payload.password + '@cluster0.fiier.mongodb.net/technicaltests?retryWrites=true&w=majority&readPreference=secondary&maxStalenessSeconds=120';
        process.env.MONGODB_CONNECTION_STRING = connectionString;

        const app = new Server(process.env);
        try {
            await app.establishDB();

            this.storeConnectionString();
        } catch (err) {
            console.log(err);
            return CommonResponses('error');
        }

        return CommonResponses('ok');
    }

    private storeConnectionString(): void {
        // Store it in the .env so if there is a restart, we don't need to put the password in again

        // lets get the current .env, need to figure out if we need to overwrite or not
        const pathToEnvFile = path.join(__dirname, '../', '.env');
        const currentEnv = fs.readFileSync(pathToEnvFile).toString('utf-8');
        let newEnv = currentEnv;

        if (currentEnv.indexOf('MONGODB_CONNECTION_STRING') === -1) {
            // does not contain it already, lets just add it and save it
            newEnv += `\n\MONGODB_CONNECTION_STRING=${process.env.MONGODB_CONNECTION_STRING}`;
        } else {
            // lets overwrite!
            newEnv = newEnv.replace(/MONGODB_CONNECTION_STRING=(.*)/, `MONGODB_CONNECTION_STRING=${process.env.MONGODB_CONNECTION_STRING}`);
        }
        fs.writeFileSync(pathToEnvFile, newEnv.toString());
    }
}