import { Component, OnInit } from '@angular/core';
import { Barel } from "app/utils/Barel";
import { Http } from "@angular/http";

@Component({
    selector: 'app-library',
    templateUrl: './library.component.html',
    styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

    constructor(private http: Http) { }

    barelz: Barel[] = [];

    ngOnInit() {
        this.http.get("/catalog", {withCredentials: true}).subscribe(
            (res: any) => {
                let barelz = res.json();
                for (let barel of barelz)
                    this.barelz.push(barel as Barel);
            }
        );
    }

    addBarel(barel: Barel) {
        this.http.post("/addBarel", {_id: barel._id}, {withCredentials: true}).subscribe(
            res => {},
            err => {}
        );
    }

}
