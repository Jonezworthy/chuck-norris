import { Response } from './response.i';

// This describes controllers
export interface Controller {
    get?: (payload?: any) => Promise<Response> | Response;
    put?: (payload?: any) => Promise<Response> | Response;
    post?: (payload?: any) => Promise<Response> | Response;
    delete?: (payload?: any) => Promise<Response> | Response;
}
