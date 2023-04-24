import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from './auth/shared/services/auth.service';
import { AccessGroup } from './shared/models/acceso.model';
import { NavigationService } from './shared/services/navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    @ViewChild('sidenav') sidenav: MatSidenav;

    accessGroups = {};
    avatar: string;

    private navigationSubscription: Subscription;

    ngDestroy$ = new Subject();

    constructor(
        private authService: AuthService,
        private navigationService: NavigationService
    ) { }

    ngOnInit(): void {
        var self = this;
        this.navigationSubscription = this.navigationService.current$.subscribe(
            (item: AccessGroup) => {
                if (item != null) {
                    self.close();
                }
            }
        );
    }

    close() {
        this.sidenav.close();
    }

    logout() {
        this.ngDestroy$.next();
        
        this.authService.signOut();
    }

    openSideNav($event) {
        this.sidenav.open();
    }
    
    ngOnDestroy() {
        this.ngDestroy$.complete();
        this.navigationSubscription.unsubscribe();
    }
}
