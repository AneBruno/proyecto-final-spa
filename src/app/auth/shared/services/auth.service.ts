import { Router              } from '@angular/router';
import { Injectable          } from '@angular/core';
import { ApiService          } from 'src/app/shared/services/api.service';
import { UserService         } from './user.service';
import { Subject             } from 'rxjs';

@Injectable()
export class AuthService {

    constructor(
        private apiService        : ApiService,
        private router            : Router,
        private userService       : UserService
    ) { }

        async login(email: string, password: string): Promise<any> {
        const loginData = { email: email, password: password };
        const respuesta = (await this.apiService.post('/auth/login', loginData).toPromise()) as any;
        if (respuesta.access_token) {
            this.userService.setAccessToken(respuesta.access_token);
            this.userService.setUser(respuesta.me);
            this.router.navigate(['app']);
        }
        console.log('respuesta', respuesta);
        return ;
    }
    public signOut(): void {
        
        this.apiService.logout().subscribe((response: any) => {
            if (response.ok) {
                this.router.navigateByUrl('/login');
                this.userService.removeSessionData();
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
