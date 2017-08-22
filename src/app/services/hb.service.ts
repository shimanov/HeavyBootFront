import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/Http';
import { GenericResult, GenericSimpleResult } from '../models/genericResult';
import { Hb } from '../models/hb';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HbService {
    private baseUrl: string = "http://localhost:54295/api/values/";

    constructor(private http: Http) {

    }

    public getById(id: number): Observable<GenericResult<Hb>> {
        return this.http.get(this.baseUrl + '/' + id)
            .map(res => res.json());
    }

    public list(): Observable<GenericResult<Hb[]>> {
        return this.http.get(this.baseUrl)
            .map(res => res.json());
    }

    public post(hb: Hb): Observable<GenericResult<Hb>> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.baseUrl, JSON.stringify(hb), { headers: headers })
            .map(res => res.json());
    }

    public put(id: number, hb: Hb): Observable<GenericSimpleResult> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put(this.baseUrl + '/' + id, JSON.stringify(hb), { headers: headers })
            .map(res => res.json());
    }

    public delete(id: number): Observable<GenericSimpleResult> {
        return this.http.delete(this.baseUrl + '/' + id)
            .map(res => res.json());
    }
}