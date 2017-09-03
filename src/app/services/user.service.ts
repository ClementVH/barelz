import { Injectable } from '@angular/core';
import { User } from "app/utils/User";
import { Http } from "@angular/http";
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";

@Injectable()
export class UserService {

    constructor(private http: Http) {}

    user: User;
    fetchUser(): Observable<User> {
        return this.http.get("/userInfos", {withCredentials: true}).map(
            res => {
                return res.json();
            }
        ).map(
            user => {
                this.user = user as User;
                return this.user;
            }
        );
    }
}
