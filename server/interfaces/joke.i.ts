import { ObjectId } from 'mongodb';

export interface Joke {
    _id?: ObjectId,
    text: string,
    createdAt?: Date,
    hidden?: boolean,
}