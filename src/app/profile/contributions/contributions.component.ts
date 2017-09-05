import { Component, OnInit, HostBinding } from '@angular/core';
import { UserService } from "app/services/user.service";
import { Barel } from "app/utils/Barel";
import { User } from "app/utils/User";
import { Http, URLSearchParams } from "@angular/http";

@Component({
    selector: 'app-contributions',
    templateUrl: './contributions.component.html',
    styleUrls: ['./contributions.component.scss']
})
export class ContributionsComponent implements OnInit {

    @HostBinding('class.col') col: boolean = true;
    @HostBinding('class.p-2') p2: boolean = true;

    constructor(private http: Http, private userService: UserService) { }

    barelz: Barel[];

    updateBarelz = (barelz: Barel[]) =>  this.barelz = barelz;

    fetchContributions = (user: User) => {
        this.http.get("/contributions", {withCredentials: true})
        .map(res => {
            this.userService.user.contributions = res.json() as Barel[];
            return res.json() as Barel[]
        })
        .subscribe(this.updateBarelz);
    };

    ngOnInit() {
        if (!this.userService.hasField('contributions')) {
            console.log(this.userService.user);
            this.userService.fetchUser(this.fetchContributions);
        }

        else
            this.updateBarelz(this.userService.user.contributions);
    }

}
