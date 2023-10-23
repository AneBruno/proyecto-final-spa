import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/shared/services/auth.service';
import { UserService } from 'src/app/auth/shared/services/user.service';
//import { ExtranetAuthService } from 'src/app/extranet/extranet.auth.service';
import { User } from '../models/user.model';

@Component({
  selector    : 'app-user-section',
  templateUrl : './user-section.component.html',
  styleUrls   : ['./user-section.component.scss']
})
export class UserSectionComponent implements OnInit {

    public user!: User;
    public userExtranet : any;
    public razon_social : any;
    public isExtranet : boolean = false;

    @Input()
    public extranet : boolean = false;

    @Output()
    public clickLogout: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        public userService         : UserService,
        public authService         : AuthService,
        //public extranetAuthService : ExtranetAuthService,
        public router              : Router,
    ) { }

    ngOnInit(): void {
        //this.setIsExtranet();
        this.user = this.userService.getUser();
        this.userService.getUser$().subscribe(user => {
            this.user = user;
        })
    }

    /*private setIsExtranet() : void {
        if(this.router.url.startsWith('/app/extranet')){
            this.isExtranet = true;
            let loginData = this.extranetAuthService.getLoginData();
            this.userExtranet = loginData.Usuario.Descripcion;
            if(loginData.accounts.length === 1){
                this.razon_social = loginData.accounts[0].Empresa;
            }
        }
    }*/

    logout() {        
        this.authService.signOut();
    }

    /*public logoutExtranet()  {
        this.extranetAuthService.logout();
        window.location.href = 'http://test.oprcer.com.ar/';
    }*/

}
