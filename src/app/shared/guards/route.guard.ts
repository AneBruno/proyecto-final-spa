import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot } from '@angular/router';
import { Injectable  } from '@angular/core';
import { AuthService } from 'src/app/auth/shared/services/auth.service';


@Injectable()
export class RouteGuard implements CanActivate, CanActivateChild {

    constructor(
        private authService: AuthService,
    ) {}

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.check(state.url.substring(5));
    }

    canActivate() {
        return this.check();
    }

    private check(url: string | null = null) {
        console.log('url', url);
        if (url !== null && url.length > 0) {
            if(url ===  'usuarios/mis-datos') return true;
            return this.authService.puedeNavegar(url);
        }

        return true;

    }

}
