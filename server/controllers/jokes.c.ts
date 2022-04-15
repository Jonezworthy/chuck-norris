import { Controller } from '../interfaces/controller.i';
import { Response } from '../interfaces/response.i';
import AutoLoad from './autoload.c';
import { default as CommonResponses } from '../utils/responses';
import { Joke } from '../interfaces/joke.i';
import { FilterQuery, ObjectId } from 'mongodb';

export default class Jokes extends AutoLoad implements Controller {

    constructor() {
        super();
    }

    public async get(payload: { page: string, size: string, sort: string, order: string }): Promise<Response> {
        if (!this.model?.read || !this.model?.count)
            return CommonResponses('error'); // dependency injection failure

        const projection = {};
        const size = (payload && payload.size ? parseInt(payload.size, 10) : 0) || 10;
        const page = (payload && payload.page ? parseInt(payload.page, 10) : 0) || 0;
        const sortCol = (payload && payload.sort ? payload.sort : 'createdAt');
        const sortOrder = (payload && payload.order === 'desc' ? -1 : 1) || -1;
        const query: FilterQuery<object> = { hidden: false }; // make sure it's not soft deleted records
        const skip = page * size;

        const sort: any = {};
        sort[sortCol] = sortOrder;

        const jokes = await this.model?.read(query, projection, size, skip, sort);
        const count = await this.model.count(query);

        return {
            count,
            data: jokes,
            status: 'ok',
        };
    }

    public async post(payload: { text: string, overwrite: string }): Promise<Response> {
        if (!this.model?.upsert)
            return CommonResponses('error'); // dependency injection failure

        const { text } = payload;
        if (!text || text.length <= 10) {
            return CommonResponses('warning', 'Joke is not long enough');
        }
        const overwrite: Boolean = payload.overwrite === 'true';
        const createdAt = new Date();
        const hidden = false;
        const joke: Joke = { text, createdAt, hidden };

        const exists: Joke[] = await this.model?.read({ text }, {});

        if (exists && exists.length) {
            // already exists
            if (overwrite === true) {
                await this.model.upsert({ text }, joke);
                return CommonResponses('ok');
            } else {
                return CommonResponses('notModified');
            }
        } else {
            // create
            await this.model.upsert({ text }, joke);
            return CommonResponses('ok');
        }
    }

    public async put(payload: Joke): Promise<Response> {
        const joke: Joke = payload;

        if (!this.model?.upsert)
            return CommonResponses('error'); // dependency injection failure

        const { text } = joke;
        if (!text || text.length <= 10) {
            return CommonResponses('warning', 'Joke is not long enough');
        }

        await this.model.upsert({ _id: new ObjectId(payload._id) }, joke);

        return CommonResponses('ok');
    }

    public async delete(payload: { _id: string }): Promise<Response> {
        if (!this.model?.delete)
            return CommonResponses('error'); // dependency injection failure

        await this.model?.delete(new ObjectId(payload._id));

        return CommonResponses('ok');
    }
}