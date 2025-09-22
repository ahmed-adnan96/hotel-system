import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [LoginComponent, CreateUserComponent , ChangePasswordComponent],
  imports: [CommonModule, AuthRoutingModule, SharedModule],
})
export class AuthModule {}
