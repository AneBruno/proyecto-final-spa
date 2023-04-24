import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable  } from '@angular/core';
import { UserService } from 'src/app/auth/shared/services/user.service';


@Injectable()
export class LoginGuard implements CanActivate, CanActivateChild {

    constructor(
        private router: Router,
        private userService: UserService,
    ) {}

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.check();
    }

    canActivate() {
        return this.check();
    }

    private check() {
        if (this.userService.isAuthenticated()) {
            return true;
        }
        
        this.router.navigate(['/login']);
        return false;
    }
  
}
