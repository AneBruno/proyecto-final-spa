import { __decorate } from "tslib";
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SocialLoginModule } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { OficinasModule } from './oficinas/oficinas.module';
import { DashboardResolver } from './shared/resolvers/dashboard.resolver';
import { LocatorService } from './shared/services/locator.service';
// deprecate use it
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
let AppModule = class AppModule {
    constructor(injector) {
        this.injector = injector;
        LocatorService.injector = this.injector;
    }
};
AppModule = __decorate([
    NgModule({
        declarations: [
            AppComponent,
        ],
        imports: [
            BrowserModule,
            BrowserAnimationsModule,
            AppRoutingModule,
            SocialLoginModule,
            NgxsReduxDevtoolsPluginModule.forRoot({
                disabled: environment.production
            }),
            SharedModule.forRoot(),
            AuthModule.forRoot(),
            FlexLayoutModule,
            OficinasModule
        ],
        providers: [
            DashboardResolver,
            {
                provide: 'SocialAuthServiceConfig',
                useValue: {
                    autoLogin: false,
                    providers: [
                        {
                            id: GoogleLoginProvider.PROVIDER_ID,
                            provider: new GoogleLoginProvider(environment.socialiteApiKey),
                        },
                    ],
                },
            }
        ],
        schemas: [
            NO_ERRORS_SCHEMA,
        ],
        bootstrap: [
            AppComponent
        ]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map