import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  ChangePasswordFormComponent,
  CreateAccountFormComponent,
  LoginFormComponent,
  ResetPasswordFormComponent
} from './shared/components';
import {AuthGuardService} from './shared/services';
import {HomeComponent} from './pages/home/home.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {DevExtremeModule} from 'devextreme-angular';
import {CommonModule} from "@angular/common";
import {MovieComponent} from "./pages/movie/movie.component";
import {MovieEditComponent} from "./pages/movie/edit/movie-edit.component";
import {ReservationEditComponent} from "./pages/movie/edit/reservation-edit.component";
import {ReservationComponent} from "./pages/reservation/reservation.component";

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'reset-password',
    component: ResetPasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'create-account',
    component: CreateAccountFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'change-password/:recoveryCode',
    component: ChangePasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'movie',
    component: MovieComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'reservation',
    component: ReservationComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true}), DevExtremeModule, CommonModule],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [
    HomeComponent,
    ProfileComponent,
    MovieComponent,
    MovieEditComponent,
    ReservationEditComponent,
    ReservationComponent
  ]
})
export class AppRoutingModule { }
