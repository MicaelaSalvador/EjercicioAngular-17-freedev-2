import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom, InjectionToken } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {  TranslateModule } from '@ngx-translate/core';
import { I18nService } from './services/i18n.service';
import { authInterceptor } from './interceptors/auth.interceptor';
// import { ApiService } from './services/api.service';

// export function apiServiceConfig(http: HttpClient){
//   return new ApiService(http);
// }

export const API_TOKEN = new InjectionToken('API_TOKEN');  


// export function createTranslateLoader(http: HttpClient) {
//   return new TranslateHttpLoader(http, './assets/i18n/', '.json');
// }


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideHttpClient(withInterceptors([authInterceptor])),
    //  ApiService
    importProvidersFrom([
      TranslateModule.forRoot(
        {
          defaultLanguage:'es',
        //   loader: {
        //     provide: TranslateLoader,
        //     useFactory: createTranslateLoader,
        //     deps: [HttpClient]
        // }
        }
      )
    ]),
    {
      useFactory:loadEnglishDataFactory,
      provide:APP_INITIALIZER,
      deps:[I18nService],
      multi:true
    },
    {
      useFactory:loadSpanishDataFactory,
      provide:APP_INITIALIZER,
      deps:[I18nService],
      multi:true
    }
  ]
};

function loadEnglishDataFactory(i18nService:I18nService) {
  return () =>  i18nService.loadEnglishData();
}

function loadSpanishDataFactory(i18nService:I18nService) {
  return () =>  i18nService.loadSpanishData();
}
