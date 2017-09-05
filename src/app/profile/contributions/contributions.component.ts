import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
    selector: 'app-contributions',
    templateUrl: './contributions.component.html',
    styleUrls: ['./contributions.component.scss']
})
export class ContributionsComponent implements OnInit {

    @HostBinding('class.col') col: boolean = true;
    @HostBinding('class.p-2') p2: boolean = true;

    constructor() { }

    ngOnInit() {
    }

}
