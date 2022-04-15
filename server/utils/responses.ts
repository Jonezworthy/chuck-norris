import { Response } from '../interfaces/response.i';

enum availableKeys {
    'error',
    'logIn',
    'notFound',
    'notModified',
    'ok',
    'permission',
    'warning',
    'file',
}
type keys = keyof typeof availableKeys;

export default function (key: keys, msg?: any): Response {
    const messageMap: { [key: string]: string } = {
        error: 'error',
        logIn: 'warning',
        notFound: 'warning',
        notModified: 'warning',
        warning: 'warning',
        ok: 'data',
        permission: 'warning',
        file: 'data',
    };
    const responses: { [key: string]: Response } = {
        error: { status: 'error', error: 'Sorry, an error has occurred' },
        warning: { status: 'warning', warning: 'Sorry, an error has occurred' },
        logIn: { status: 'warning', warning: 'You are not logged in' },
        notModified: { status: 'warning', warning: 'No changes were made' },
        notFound: { status: 'warning', warning: 'Not found' },
        ok: { status: 'ok' },
        permission: { status: 'warning', warning: 'You do not have permission to do this' },
        file: { status: 'file' },
    };

    if (key in responses && responses[key]) {
        if (msg && key in messageMap) {
            const response: any = responses[key];
            const extraKey: string = messageMap[key];
            response[extraKey] = msg;

            return response;
        } else {
            return responses[key];
        }
    } else {
        return responses.error;
    }
}
