import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BearerTokenInterceptor } from '../interceptors/bearer-token.interceptor';

export const httpInterceptorProviders = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: BearerTokenInterceptor,
        multi: true 
    }
]