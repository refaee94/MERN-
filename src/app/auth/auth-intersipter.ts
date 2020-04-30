import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class authInterceptor implements HttpInterceptor {
  constructor(private auth :AuthService) {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler){
   const authToken=this.auth.getToken();
   const authRequest=req.clone({

    headers:req.headers.set('authorizetion','Bearer '+authToken)
   })
    return next.handle(authRequest);
  }
}
