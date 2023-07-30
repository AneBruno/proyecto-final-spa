import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule                  } from '@angular/common';
import { RouterModule                  } from '@angular/router';
import { FlexLayoutModule              } from '@angular/flex-layout';

import { AuthService                   } from './shared/services/auth.service';
import { UserService                   } from './shared/services/user.service';
import { SharedModule                  } from '../shared/shared.module';

import { ButtonComponent               } from './button/button.component';
import { LoginComponent                } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { RegistroExitoComponent } from './registro-exito/registro-exito.component';


@NgModule({
    declarations: [
        LoginComponent,
        ButtonComponent,
        RegistroComponent,
        RegistroExitoComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        SharedModule,
        FlexLayoutModule
    ]
})
export class AuthModule { 
    static forRoot(): ModuleWithProviders<AuthModule> {
        return {
            ngModule: AuthModule,
            providers: [
                AuthService,
                UserService,
            ]
        }
    }  
}
