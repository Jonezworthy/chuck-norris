import { Controller } from '../interfaces/controller.i';
import { Response } from '../interfaces/response.i';
import AutoLoad from './autoload.c';
import { default as CommonResponses } from '../utils/responses';
import axios from 'axios';
import { Joke } from '../interfaces/joke.i';

export default class Search extends AutoLoad implements Controller {

    public async get(): Promise<Response> {

        const url = 'https://api.icndb.com/jokes/random';

        try {
            const httpResponse = await axios.get(url);
            if (httpResponse && httpResponse.data) {
                const theirJoke: { type: string, value: { id: number, joke: string, categories: string[] } } = httpResponse.data;
                const joke: Joke = { text: theirJoke.value.joke.decodeEntities() };

                return CommonResponses('ok', joke);
            }
            return CommonResponses('error');
        } catch (err) {
            return CommonResponses('error');
        }
    }
}