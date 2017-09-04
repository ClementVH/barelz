import { Injectable } from '@angular/core';
import { User } from "app/utils/User";
import { Http, URLSearchParams } from "@angular/http";
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";

@Injectable()
export class UserService {

    constructor(private http: Http) {}

    user: User;
    fetchUser(cb: ((value: User) => void)) {
        return this.http.get("/userInfos", {withCredentials: true}).map(
            res => {
                return res.json();
            }
        ).map(
            user => {
                this.user = user as User;
                return this.user;
            }
        ).subscribe(cb);
    }

    removeBarel(_id: string, cb?: any): Observable<any>{
        let params = new URLSearchParams();
        params.set('_id', _id)
        if (!cb)
            return this.http.get("/removeBarel", {search: params, withCredentials: true});
        else
            this.http.get("/removeBarel", {search: params, withCredentials: true}).subscribe(cb);
    }

    addBarel(_id: string, cb?: any): Observable<any>{
        let params = new URLSearchParams();
        params.set('_id', _id)
        if (!cb)
            return this.http.post("/addBarel", {_id}, {withCredentials: true});
        else
            this.http.post("/addBarel", {_id}, {withCredentials: true}).subscribe(cb);
    }
}
