import { Component, OnInit } from '@angular/core';
import { UserService } from "app/services/user.service";
import { Http } from "@angular/http";
import { Barel } from "app/utils/Barel";
import { User } from "app/utils/User";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}