var AuthModule_1;
import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthService } from './shared/services/auth.service';
import { UserService } from './shared/services/user.service';
import { SharedModule } from '../shared/shared.module';
import { ButtonComponent } from './button/button.component';
import { LoginComponent } from './login/login.component';
let AuthModule = AuthModule_1 = class AuthModule {
    static forRoot() {
        return {
            ngModule: AuthModule_1,
            providers: [
                AuthService,
                UserService,
            ]
        };
    }
};
AuthModule = AuthModule_1 = __decorate([
    NgModule({
        declarations: [
            LoginComponent,
            ButtonComponent
        ],
        imports: [
            RouterModule,
            CommonModule,
            SharedModule,
            FlexLayoutModule
        ]
    })
], AuthModule);
export { AuthModule };
//# sourceMappingURL=auth.module.js.map