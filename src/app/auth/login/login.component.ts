import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})

export class LoginComponent implements OnInit,OnDestroy {
  isLoading=false;
  private authSub:Subscription;
  constructor(private authService: AuthService) {

  }
  ngOnDestroy(): void {
this.authSub.unsubscribe();  }

  ngOnInit() {this.authSub=this.authService.getAuthStatusListener().subscribe(res=>{
    this.isLoading=false;
  });}

  onLogin(form:NgForm){

 if(form.invalid){

      return;
    }

this.authService.login(form.value.email,form.value.password);
this.isLoading=true;
  }
}
