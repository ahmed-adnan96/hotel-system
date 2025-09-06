import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { provideClientHydration } from '@angular/platform-browser';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

@NgModule({
  declarations: [LoginComponent, CreateUserComponent , ChangePasswordComponent],
  imports: [CommonModule, AuthRoutingModule, SharedModule],
})
export class AuthModule {}
