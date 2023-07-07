import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { AuthService           } from 'src/app/auth/shared/services/auth.service';
import { AccessGroup           } from '../models/acceso.model';
import { NavigationService     } from '../services/navigation.service';
import { UserService           } from 'src/app/auth/shared/services/user.service';
import { User                  } from '../models/user.model';
import { Router                } from '@angular/router';

@Component({
    selector: 'app-main-toolbar',
    templateUrl: './main-toolbar.component.html',
    styleUrls: ['./main-toolbar.component.scss']
})
export class MainToolbarComponent implements OnInit {
    @Output() toogleSideNav: EventEmitter<boolean> = new EventEmitter<boolean>();
    
    accessGroups = {};
    avatar: string;
    user: User;
    //public isExtranet : boolean = false;

    private navigationSubscription: Subscription;

    currentSection: AccessGroup;

    constructor(
        private authService: AuthService,
        private userService: UserService,
        private navigationService: NavigationService,
        private router : Router,
    ) { }

    ngOnInit(): void {
        //this.setIsExtranet();
        this.user = this.userService.getUser();
        this.accessGroups = this.userService.getAccessTree();
        console.log('this.accessGroups', this.accessGroups);
        this.getAvatar();
        this.navigationSubscription = this.navigationService.current$.subscribe(
            (item: AccessGroup) => {
                this.currentSection = item
            }
        );
    }

    /*public setIsExtranet() : void {
        if(this.router.url.startsWith('/app/extranet')){
            this.isExtranet = true;
        }
    }*/
    
    getAvatar() {
        let urlImagen = this.user.urlImagen||'';
        this.avatar = `url(${urlImagen})`;
    }

    logout() {        
        this.authService.signOut();
    }

    openMobileMenu() {
        console.log('holas');
        this.toogleSideNav.emit(true);
    }
    
    ngOnDestroy() {
        this.navigationSubscription.unsubscribe();
    }
}
