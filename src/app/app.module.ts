import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ProfileModule } from "app/profile/profile.module";
import { Ng2FileInputModule } from 'ng2-file-input';

import { AppComponent } from './app.component';
import { AuthModule } from "app/auth/auth.module";
import { HomeComponent } from './home/home.component';
import { LibraryComponent } from './library/library.component';
import { UserService } from "app/services/user.service";

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
    Ng2FileInputModule.forRoot(),
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