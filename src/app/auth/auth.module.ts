import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthGuard } from "app/auth/auth.guard";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from "@angular/forms";
import { MDBBootstrapModule } from "angular-bootstrap-md";

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    MDBBootstrapModule,
  ],
  providers: [
    AuthGuard
  ],
  declarations: [LoginComponent, RegisterComponent],
})
export class AuthModule { }
