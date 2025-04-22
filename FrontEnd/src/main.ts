import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { LoaderInterceptor, HTTPStatus } from './app/interceptor/loader.interceptor';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from './app/services/auth.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    appConfig.providers,
    HTTPStatus,
    provideHttpClient(
      withInterceptors([
        (req, next) => {
          const loaderInterceptor = new LoaderInterceptor(
            inject(NgxSpinnerService),
            inject(HTTPStatus),
            inject(AuthService),
            inject(Router)
          );
          return loaderInterceptor.intercept(req, {
            handle: next
          });
        }
      ])
    )
  ]
}).catch((err) => console.error(err));