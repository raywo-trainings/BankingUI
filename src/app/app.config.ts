import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter, withComponentInputBinding } from "@angular/router";

import { routes } from "./app.routes";
import { provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
import { errorInterceptor } from "./common/interceptors/error.interceptor";


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withFetch(), withInterceptors([errorInterceptor])),
    provideRouter(routes, withComponentInputBinding())
  ]
};
