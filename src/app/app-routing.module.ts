import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "app/auth/auth.guard";
import { LoginComponent } from "app/auth/login/login.component";
import { AuthService } from "app/auth/auth.service";
import { RegisterComponent } from "app/auth/register/register.component";
import { HomeComponent } from "app/home/home.component";
import { ProfileComponent } from "app/profile/profile.component";
import { LibraryComponent } from "app/library/library.component";
import { MyBarelzComponent } from "app/profile/my-barelz/my-barelz.component";
import { ContributionsComponent } from "app/profile/contributions/contributions.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'library',
    component: LibraryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'myBarelz',
        pathMatch: 'full'
      },
      {
        path: 'myBarelz',
        component: MyBarelzComponent
      },
      {
        path: 'contributions',
        component: ContributionsComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: [AuthGuard, AuthService]
})
export class AppRoutingModule { }
