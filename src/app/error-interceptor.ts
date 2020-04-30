import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ErrorComponent } from './error/error.component';
@Injectable()
export class errorInterceptor implements HttpInterceptor {
  constructor(private dialog: MatDialog) {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler) {

    return next.handle(req).pipe(catchError((error: HttpErrorResponse) => {
      let errMessage='UnKnown error'
if (error.error.message) {
errMessage=error.error.message;
}
      this.dialog.open(ErrorComponent,{data:{message:errMessage}});
      return throwError(error);
    }));
  }
}
