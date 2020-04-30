import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from '../auth/auth.service';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})

export class HeaderComponent implements OnInit, OnDestroy {
  isAuthentacated: boolean = false;
  private authListenerSub: Subscription;
  constructor(private auth: AuthService) {

  }


  ngOnInit() {
    this.isAuthentacated = this.auth.getIsAuth();
    this.authListenerSub = this.auth.getAuthStatusListener().subscribe(res => {

      this.isAuthentacated = res;
    })
  }
  ngOnDestroy(): void {
this.authListenerSub.unsubscribe();  }

  onLogout(){

    this.auth.logout();
  }
}
