import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { GoogleLoginProvider } from 'angularx-social-login';
import { Subject } from 'rxjs';
let AuthService = class AuthService {
    constructor(socialAuthService, apiService, router, userService) {
        this.socialAuthService = socialAuthService;
        this.apiService = apiService;
        this.router = router;
        this.userService = userService;
    }
    signInWithGoogle() {
        this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }
    signOut() {
        this.socialAuthService.signOut();
        this.apiService.logout().subscribe((response) => {
            if (response.ok) {
                this.router.navigateByUrl('/login');
                this.userService.removeSessionData();
            }
        });
    }
    inicializarObsAuthState() {
        this.socialAuthService.authState.subscribe(user => {
            if (user) {
                this.apiService.login(user.authToken).subscribe((response) => {
                    if (response.access_token) {
                        this.userService.setAccessToken(response.access_token);
                        this.userService.setUser(response.me);
                        this.router.navigate(['app']);
                    }
                });
            }
        });
    }
    tieneAcceso(nombre) {
        return (this.userService.accesos)
            .filter(row => row.tipo === 'accion')
            .filter(row => row.nombre === nombre)
            .length > 0;
    }
    /**
     * El método verifica si un usuario puede navegar la url de acuerdo
     * a los permisos de tipo menú.
     * Para ello compara si la url dada comienza con algunas de las
     * urls de menú.
     * Ejemplo:
     * url dada: /clientes/empresas/agregar
     * url acceso: /clientes/empresas
     * resultado: tiene acceso.
     */
    puedeNavegar(uri) {
        let $puedeNavegar = new Subject();
        this.userService.fetchUserAsync().then((user) => {
            $puedeNavegar.next(user.accesos
                .filter(row => row.tipo === 'menu')
                .filter(row => uri.startsWith(row.uri))
                .length > 0);
        });
        return $puedeNavegar;
    }
};
AuthService = __decorate([
    Injectable()
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map