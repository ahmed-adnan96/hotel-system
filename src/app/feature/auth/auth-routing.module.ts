import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { NotFoundComponent } from '../shared/components/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, title: 'login' },
  { path: 'createUser', component: CreateUserComponent, title: 'createUser' },
  {
    path: 'forgetPassword',
    component: ForgetPasswordComponent,
    title: 'forgetPassword',
  },
  {
    path: 'changePassword',
    component: ChangePasswordComponent,
    title: 'changePassword',
  },
  {
    path: 'resetPassword',
    component: ResetPasswordComponent,
    title: 'resetPassword',
  },
  { path: '**', component: NotFoundComponent, title: 'notFound' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
