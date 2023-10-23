import { NgModule, NO_ERRORS_SCHEMA                } from '@angular/core';
import { Injector                } from '@angular/core';
import { FlexLayoutModule        } from '@angular/flex-layout';
import { BrowserModule           } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule        } from './app-routing.module';
import { AppComponent            } from './app.component';
import { environment             } from 'src/environments/environment';
import { SharedModule            } from './shared/shared.module';
import { AuthModule              } from './auth/auth.module';
import { DashboardResolver       } from './shared/resolvers/dashboard.resolver';
import { LocatorService          } from './shared/services/locator.service';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        AuthModule,
        SharedModule.forRoot(),
        AuthModule.forRoot(),
        FlexLayoutModule,
        CanvasJSAngularChartsModule
    ],
    providers: [
        DashboardResolver,
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
