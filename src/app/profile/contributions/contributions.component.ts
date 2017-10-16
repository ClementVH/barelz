import { Component, OnInit, HostBinding } from '@angular/core';
import { UserService } from "app/services/user.service";
import { Barel } from "app/utils/Barel";
import { User } from "app/utils/User";
import { Http, URLSearchParams } from "@angular/http";
import { Ng2FileInputAction } from "ng2-file-input/dist/ng2-file-input";

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

    inputTable: any[];

    updateBarelz = (barelz: Barel[]) => {
        this.barelz = barelz;
        this.inputTable =this.barelz.map(() => {return {show: false}});

    }

    fetchContributions = (user: User) => {
        this.http.get("/contributions", {withCredentials: true})
        .map(res => {
            this.userService.user.contributions = res.json() as Barel[];
            return res.json() as Barel[];
        })
        .subscribe(this.updateBarelz);
    };

    ngOnInit() {
        if (!this.userService.hasField('contributions'))
            this.userService.fetchUser(this.fetchContributions);

        else
            this.updateBarelz(this.userService.user.contributions);
    }

    showFileInput(index: number): void {
        this.inputTable[index].show = !this.inputTable[index].show;
    }

    fillTable(event, index: number) {
        if (event.action===Ng2FileInputAction.Added)
            this.inputTable[index].file = event.file;
    }

    updateBarel(_id: string, index: number) {
        console.log(this.inputTable[index].file);
        this.http.post('/updateBarel', this.inputTable[index].file, {withCredentials: true})
            .subscribe(
                res => this.userService.fetchUser(this.fetchContributions)
            );
    }
}
