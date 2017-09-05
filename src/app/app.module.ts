import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppComponent } from './app.component';
import { AuthModule } from "app/auth/auth.module";
import { HomeComponent } from './home/home.component';
import { LibraryComponent } from './library/library.component';
import { UserService } from "app/services/user.service";
import { ProfileModule } from "app/profile/profile.module";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LibraryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    AuthModule,
    ProfileModule
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }