import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AngularMaterialModuleModule } from '../angular-material-module/angular-material-module.module';
import { FormsModule } from '@angular/forms';
import { AuthRoutingRoutingModule } from './auth-routing-routing.module';



@NgModule({
  declarations: [    LoginComponent,
    SignupComponent],
  imports: [
    CommonModule,AngularMaterialModuleModule,FormsModule,AuthRoutingRoutingModule

  ]
})
export class AuthModule { }
