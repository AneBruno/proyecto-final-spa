import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav                   } from '@angular/material/sidenav';
import { NavigationEnd, Router        } from '@angular/router';
import { Subject, Subscription        } from 'rxjs';
import { filter                       } from 'rxjs/operators';
import { AuthService                  } from 'src/app/auth/shared/services/auth.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    @ViewChild('sidenav') sidenav: MatSidenav;

    private navigationSubscription: Subscription;

    ngDestroy$ = new Subject();

    constructor(
        private authService: AuthService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        var self = this;

        this.navigationSubscription = this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((s: NavigationEnd) => {
           this.close();
        });
    }

    close() {
        this.sidenav.close();
    }

    logout() {
        this.ngDestroy$.next();
        
        this.authService.signOut();
    }

    openSideNav($event) {
        console.log(this.sidenav.opened, 'opened?')
        if(!this.sidenav.opened){
            this.sidenav.open();
        }
        else{
            this.sidenav.close();
        }
    }
    
    ngOnDestroy() {
        this.ngDestroy$.complete();
        this.navigationSubscription.unsubscribe();
    }

}
