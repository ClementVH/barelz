import { Component, OnInit } from '@angular/core';
import { Barel } from "app/utils/Barel";
import { Http } from "@angular/http";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "app/services/user.service";

@Component({
    selector: 'app-library',
    templateUrl: './library.component.html',
    styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

    constructor(private http: Http, private userService: UserService, private route: ActivatedRoute) { }

    barelz: Barel[] = [];

    fetchCatalog: () => void;

    ngOnInit() {

        this.fetchCatalog = () => {
            this.http.get("/catalog", {withCredentials: true}).subscribe(
                (res: any) => {
                    let barelz = res.json();
                    this.barelz = [];
                    for (let barel of barelz)
                        this.barelz.push(barel as Barel);
                }
            );
        }

        this.route.url.map(url => url[0]).subscribe(
            url => {
                if (url.path == "library")
                    this.fetchCatalog();
            }
        );
    }

    addBarel(barel: Barel) {
       this.userService.addBarel(barel._id, this.fetchCatalog);
    }

}
