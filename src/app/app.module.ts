import { NgModule, NO_ERRORS_SCHEMA                } from '@angular/core';
import { Injector                } from '@angular/core';
import { FlexLayoutModule        } from '@angular/flex-layout';
import { BrowserModule           } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SocialLoginModule       } from 'angularx-social-login';
import { SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider     } from 'angularx-social-login';

import { AppRoutingModule        } from './app-routing.module';
import { AppComponent            } from './app.component';
import { environment             } from 'src/environments/environment';
import { SharedModule            } from './shared/shared.module';
import { AuthModule              } from './auth/auth.module';
import { OficinasModule          } from './oficinas/oficinas.module';
import { DashboardResolver       } from './shared/resolvers/dashboard.resolver';
import { LocatorService          } from './shared/services/locator.service';

// deprecate use it
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

@NgModule({
    declarations: [
        AppComponent
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
            } as SocialAuthServiceConfig,
        }
    ],
    schemas: [
        NO_ERRORS_SCHEMA,
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
    constructor(private injector: Injector) {    // Create global Service Injector.
        LocatorService.injector = this.injector;
    }
}
