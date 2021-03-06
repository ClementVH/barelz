import { Component, OnInit, HostBinding } from '@angular/core';
import { UserService } from "app/services/user.service";
import { Http } from "@angular/http";
import { Barel } from "app/utils/Barel";
import { User } from "app/utils/User";

@Component({
  selector: 'app-my-barelz',
  templateUrl: './my-barelz.component.html',
  styleUrls: ['./my-barelz.component.scss']
})
export class MyBarelzComponent implements OnInit {

    constructor(private http: Http, private userService: UserService) {}

    @HostBinding('class.col') col: boolean = true;
    @HostBinding('class.p-2') p2: boolean = true;

    barelz: Barel[];

    updateBarelz = (user: User) => this.barelz = user.barelz;

    ngOnInit() {
        if (!this.userService.user)
            this.userService.fetchUser(this.updateBarelz)

        else
            this.updateBarelz(this.userService.user);
    }

    removeBarel(_id: string): void {
        this.userService.removeBarel(_id).subscribe(
            res => this.userService.fetchUser(this.updateBarelz)
        );
    }

}
