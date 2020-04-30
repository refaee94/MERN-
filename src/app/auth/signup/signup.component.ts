import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgModel, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"]
})

export class SignupComponent implements OnInit,OnDestroy {
isLoading=false;
private authSub:Subscription;
  constructor(private authService: AuthService) {

  }
  ngOnDestroy(): void {
this.authSub.unsubscribe();  }

  ngOnInit() {this.authSub=this.authService.getAuthStatusListener().subscribe(res=>{
    this.isLoading=false;
  });

  }
  onSignup(form:NgForm){
    if(form.invalid){

      return;
    }
this.authService.createUser(form.value.email,form.value.password)
this.isLoading=true;

  }
}
