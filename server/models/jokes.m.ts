import { Db, FilterQuery, ObjectId } from 'mongodb';
import { Model } from '../interfaces/model.i';
import { Joke } from '../interfaces/joke.i';

export default class Jokes implements Model {
    private database: Db;


    constructor(database: Db) {
        this.database = database;
    }

    public async read(query: FilterQuery<object>, projection: object = {}, limit: number = 1000, skip: number = 0, sort: object = { createdAt: -1 }): Promise<Joke[]> {
        return await this.database.collection('jokes').find(query).project(projection).sort(sort).limit(limit).skip(skip).toArray() as Joke[];
    }

    public async upsert(query: FilterQuery<object>, data: Joke) {
        if (data._id)
            delete data._id;

        return await this.database.collection('jokes').updateOne(query, { $set: data }, { upsert: true });
    }
    public async count(query: FilterQuery<object>): Promise<number> {
        return await this.database.collection('jokes').find(query).count();
    }

    public async delete(_id: ObjectId): Promise<Object> {
        return await this.database.collection('jokes').deleteOne({ _id });
    }
}
