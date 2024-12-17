import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { apiInterceptor } from './service/api.interceptor';
import { NgxPermissionsModule } from 'ngx-permissions';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { ToastrModule } from 'ngx-toastr';



export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
              provideClientHydration(),
              provideHttpClient(withInterceptors([apiInterceptor]),
              withFetch()), 
              importProvidersFrom(NgxPermissionsModule.forRoot()),
              importProvidersFrom(NgHttpLoaderModule.forRoot()),
              importProvidersFrom(ToastrModule.forRoot({
                timeOut: 3000,
                positionClass: 'toast-top-right',
                preventDuplicates: true,
              })),
  ]
};
