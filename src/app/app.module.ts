import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { authInterceptor } from "./auth/auth-intersipter";
import { errorInterceptor } from "./error-interceptor";
import { ErrorComponent } from "./error/error.component";
import { AngularMaterialModuleModule } from "./angular-material-module/angular-material-module.module";
import { PostModuleModule } from './post-module/post-module.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    ErrorComponent,
    AppComponent,
    HeaderComponent
  ],
  imports: [BrowserModule,BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    AngularMaterialModuleModule,
    PostModuleModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: authInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: errorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent],
})
export class AppModule {}
