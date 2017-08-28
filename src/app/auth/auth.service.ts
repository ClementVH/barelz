import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Http, Jsonp, URLSearchParams } from "@angular/http";

import { Cookie } from 'ng2-cookies';
import { Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import 'rxjs/add/operator/map'

@Injectable()
export class AuthService {
  access_token: string;

  constructor(private http: Http, private router: Router) {
    this.access_token = Cookie.get("access_token");
  }

  login(options): void {
    let params = new URLSearchParams();
    params.set('username', options.username);
    params.set('password', options.password);
    this.http.get("/login", { search: params, withCredentials: true }).subscribe(
      res => {
        this.access_token = Cookie.get("access_token");
        this.router.navigateByUrl("/")
      }
    )
  }

  register(options): void {
    this.http.post("/register", options, {withCredentials: true}).subscribe(
      res => {
        this.access_token = Cookie.get("access_token");
        this.login(options);
      },
      err => {
        throw err;
      }
    );
  }
}