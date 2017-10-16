import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { Ng2FileInputModule } from 'ng2-file-input';

import { ProfileComponent } from './profile.component';
import { MyBarelzComponent } from './my-barelz/my-barelz.component';
import { ContributionsComponent } from './contributions/contributions.component';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MDBBootstrapModule,
    Ng2FileInputModule,
  ],
  declarations: [ProfileComponent, MyBarelzComponent, ContributionsComponent]
})
export class ProfileModule { }
