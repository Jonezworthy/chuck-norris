import bodyParser = require('body-parser');
import express = require('express');
import mongo = require('mongodb');
import { MongoClientOptions } from 'mongodb';
import { Controller } from '../interfaces/controller.i';
import { Environment } from '../interfaces/environment.i';
import { Response } from '../interfaces/response.i';
import { Process } from '../interfaces/process.i';
import '../prototypes/string';
import * as Controllers from './_export';

declare var process: Process;

export default class Server {
    public env: Environment;
    private allowedMethods: string[] = ['put', 'get', 'post', 'delete'];

    constructor(env: any) {
        this.env = env;
    }

    public async establishDB(): Promise<any> {
        // connect to the database
        if (this.env.MONGODB_CONNECTION_STRING) {

            console.log('Connecting to Databases...');
            const MongoClient = mongo.MongoClient;
            const connectOptions: MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true, keepAlive: true, connectWithNoPrimary: true };
            const databaseServer = await new MongoClient(this.env.MONGODB_CONNECTION_STRING, connectOptions).connect();

            process.db = databaseServer.db('chucknorris');
        } else {
            console.log('No database string');
        }
    }

    public async setupRoutes(): Promise<any> {
        // establish dynamic routing
        const app: express.Application = express();
        this.assignMiddleware(app);

        app.listen(this.env.PORT, () => {
            console.log('Listening on port: ' + this.env.PORT);
        });
        app.use('*', async (req: express.Request, res: express.Response) => {
            res.set('Content-Type', 'application/json'); // We always return application/json - SaaS
            const baseUrl: string = req.baseUrl;
            const endpoints: string[] = baseUrl.split('/');

            if (req.baseUrl === '') {
                return res.send({ status: 'ok', connected: !!process.db });
            }

            if (endpoints[1]) {
                const endpoint = endpoints[1].trim();

                const application = endpoint.toUpperCaseFirst();
                const method = req.method.toLowerCase();
                if (application in Controllers) {
                    const dynController: Controller | any = this.assignController(application, req, res);
                    const payload: object = this.assignPayload(req);

                    if (method === 'options' && dynController) {
                        const availableMethods = [];
                        for (const allowedMethod of this.allowedMethods) {
                            if (allowedMethod in dynController && dynController[allowedMethod] && typeof dynController[allowedMethod] === 'function') {
                                availableMethods.push(allowedMethod.toUpperCase());
                            }
                        }

                        res.header('Access-Control-Request-Method', availableMethods.join(', '));
                        res.header('Access-Control-Allow-Methods', availableMethods.join(', '));

                        return res.send({ status: 'ok', data: availableMethods });

                    } else {
                        try {

                            if (method in dynController && typeof dynController[method] === 'function') {
                                const response: Response = await dynController[method](payload);
                                if (response.status === 'redirect') {
                                    res.statusCode = 302;
                                    res.setHeader('Location', response.data);
                                    return res.send();
                                } else {
                                    if (response && response.status === 'error') {
                                        res.statusCode = 500;
                                    } else {
                                        if (response.status === 'warning' && response.warning === 'No changes were made') {
                                            res.statusCode = 304
                                        } else {
                                            res.statusCode = 200;
                                        }
                                    }
                                }

                                if (response.status === 'file' && response.data && 'content' in response.data && response.data.content) {
                                    res.setHeader('Content-Type', response.data.content);
                                    return res.send(response.data.data);
                                }
                                return res.send(response);
                            } else {
                                console.log(application + ' not found');
                                return res.send({ status: 'error', error: 'Bad Request' });
                            }
                        } catch (error) {
                            const err: any = error;
                            return res.send({ status: 'error', error: 'An error has occurred! (Caught)', stack: err.stack.toString() });
                        }

                    }
                } else {
                    console.log(application + ' not found');
                    res.statusCode = 400;
                    return res.send({ status: 'error', error: 'Bad Request' });
                }
            } else {
                res.statusCode = 400;
                return res.send({ status: 'error', error: 'Bad Request' });
            }
        });
    }

    private assignMiddleware(app: express.Application): void {
        // Place all middleware stuff in here
        // to support JSON-encoded bodies

        app.use(bodyParser.json({
            limit: '50mb',
        }));
        app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
            extended: true,
            limit: '50mb',
        }));
        app.use(bodyParser.raw());

        const allowedDomains = [
            'http://localhost:4200',
        ];

        app.use('*', (req: express.Request, res: express.Response, next: Function) => {
            const referrer: string | string[] = req.headers.origin || '';
            if (typeof referrer === 'string' && allowedDomains.indexOf(referrer) !== -1) {
                res.set('Access-Control-Allow-Origin', referrer);
            }
            res.set('Access-Control-Allow-Credentials', 'true');
            res.set('Access-Control-Allow-Headers', 'content-type, authorization, x-requested-with');

            next();
        });

    }

    private assignController(controller: string, request: express.Request, response: express.Response): Controller | any {
        const library: any = Controllers; // Circumventing element is an <any> error
        if (controller in library) {
            return new (library[controller])(request, response);
        }
    }

    private assignPayload(req: express.Request): object {
        const payload: any = {};
        if (req && 'query' in req && Object.keys(req.query).length > 0) {
            Object.keys(req.query).map((key: string) => {
                payload[key] = req.query[key];
            });
        }
        if (req && 'body' in req && Object.keys(req.body).length > 0) {
            Object.keys(req.body).map((key: string) => {
                payload[key] = req.body[key];
            });
        }


        return payload;
    }
}
