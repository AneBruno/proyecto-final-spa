import { Router              } from '@angular/router';
import { Injectable          } from '@angular/core';
import { GoogleLoginProvider } from 'angularx-social-login';
import { SocialAuthService   } from 'angularx-social-login';
import { ApiService          } from 'src/app/shared/services/api.service';
import { UserService         } from './user.service';
import { Subject             } from 'rxjs';

@Injectable()
export class AuthService {

    constructor(
        private socialAuthService : SocialAuthService,
        private apiService        : ApiService,
        private router            : Router,
        private userService       : UserService,
    ) { }

    public signInWithGoogle(): void {
        this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }

    public signOut(): void {
        this.socialAuthService.signOut();

        this.apiService.logout().subscribe((response: any) => {
            if (response.ok) {
                this.router.navigateByUrl('/login');
                this.userService.removeSessionData();
            }
        });

    }

    public inicializarObsAuthState() {
        this.socialAuthService.authState.subscribe(user => {
            if (user) {
                this.apiService.login(user.authToken).subscribe((response: any)  => {
                    if (response.access_token) {
                        this.userService.setAccessToken(response.access_token);
                        this.userService.setUser(response.me);
                        this.router.navigate(['app']);
                    }
                });
            }
        });
    }

    public tieneAcceso(nombre: string): boolean {

        return (this.userService.accesos)
            .filter(row => row.tipo   === 'accion')
            .filter(row => row.nombre === nombre  )
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
    public puedeNavegar(uri: string): Subject<boolean> {
        let $puedeNavegar = new Subject<boolean>();

        this.userService.fetchUserAsync().then((user: any) => {
            $puedeNavegar.next(user.accesos
                .filter(row => row.tipo === 'menu'    )
                .filter(row => uri.startsWith(row.uri))
                .length > 0
            );
        });

        return $puedeNavegar;
    }
}
