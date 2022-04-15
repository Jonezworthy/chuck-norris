import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Joke } from '../../interfaces/joke';
import { ApiResponse } from '../../interfaces/apiResponse';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class JokesService {

    constructor(private http: HttpClient) { }


    async getNewJoke(): Promise<Joke> {
        try {
            const url = environment.apiURL + '/search';

            const res: ApiResponse | any = await this.http.get(url).toPromise();
            if (res.status === 'ok') {
                return res.data;
            } else {
                return null;
            }
        } catch (err) {
            return null;
        }
    }


    getJokes(sortBy: string = 'createdAt', sortDirection: string = 'desc', page: number = 0, size: number = 10): Observable<{ data: { data: Joke[] }, count: number }> {
        let url = environment.apiURL + '/jokes';

        url += '?sort=' + sortBy;
        url += '&order=' + sortDirection;
        url += '&page=' + page;
        url += '&size=' + size;

        return this.http.get<{ data: { data: Joke[] }, count: number }>(url, { withCredentials: true });
    }

    async postJoke(joke: Joke, overwrite: Boolean): Promise<ApiResponse | HttpResponse<object> | undefined> {
        try {
            const url = environment.apiURL + '/jokes?overwrite=' + overwrite.toString();

            const res: ApiResponse | any = await this.http.post(url, joke).toPromise();
            return res;

        } catch (err) {
            return err;
        }
    }

    async putJoke(joke: Joke): Promise<ApiResponse | HttpResponse<object> | undefined> {
        try {
            const url = environment.apiURL + '/jokes';

            const res: ApiResponse | any = await this.http.put(url, joke).toPromise();
            return res;

        } catch (err) {
            return err;
        }
    }
    async deleteJoke(joke: Joke): Promise<ApiResponse | HttpResponse<object> | undefined> {
        try {
            const url = environment.apiURL + '/jokes?_id=' + joke._id;

            const res: ApiResponse | any = await this.http.delete(url).toPromise();
            return res;

        } catch (err) {
            return err;
        }
    }
}
