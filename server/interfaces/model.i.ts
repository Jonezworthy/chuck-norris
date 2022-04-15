import { FilterQuery, ObjectId } from 'mongodb';

export interface Model {
    read: (query: FilterQuery<object>, projection: object, limit?: number, skip?: number, sort?: object) => any;
    upsert?: (query: FilterQuery<object>, data: any) => object;
    insert?: (data: any) => object;
    count?: (query: FilterQuery<object>) => number | Promise<number>;
    delete?: (_id: ObjectId) => object;
}
