import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable  } from '@angular/core';
import { ExtranetAuthService } from './extranet.auth.service';


@Injectable({providedIn: 'root'})
export class ExtranetGuard implements CanActivate, CanActivateChild {

    constructor(
        private authService: ExtranetAuthService,
        private router: Router,
    ) {}

    public async canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        let can = await this.check(state.url.substring(5));
        console.log('canActivateChild', childRoute, can);

        return can;
    }

    public async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        let can = await this.check(state.url.substring(5));
        console.log('canActivate', route, can);

        return can;
    }

    private async check(url: string | null = null): Promise<boolean> {
        let urlParts = (url || '').split('/').reverse();
        let token    = urlParts[0] || '';

        if (urlParts.length > 0 && token.length == 64) {
            this.authService.storeToken(token);
        }

        if (!this.authService.getIsValid()) {
            let token = this.authService.getToken();
            if (!token) {
                this.router.navigate(['/login']);
                return;
            }
            
            await this.authService.login(token);
        }
        
        return this.authService.getIsValid();

    }

}
