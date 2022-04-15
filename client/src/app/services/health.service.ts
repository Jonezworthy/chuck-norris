import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../interfaces/apiResponse';

@Injectable({
    providedIn: 'root'
})
export class HealthService {


    constructor(private http: HttpClient) { }

    async getHealthCheck(): Promise<Boolean> {
        const url = environment.apiURL + '/health';
        const res: ApiResponse | any = await this.http.get(url).toPromise();
        if (res.status === 'ok' && res.data && 'connected' in res.data && res.data.connected !== undefined) {
            return res.data.connected;
        } else {
            return null;
        }
    }
    async updateDatabasePassword(password: string): Promise<Boolean> {
        try {
            const url = environment.apiURL + '/health';
            const res: ApiResponse | any = await this.http.post(url, { password }).toPromise();

            if (res.status === 'ok') {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    }
}
