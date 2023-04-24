import { NgModule             } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteGuard           } from './shared/guards/route.guard';
import { LoginGuard           } from './shared/guards/login.guard';
import { DashboardComponent   } from './shared/dashboard/dashboard.component';
import { DashboardExtranetComponent } from './shared/dashboard-extranet/dashboard-extranet.component';
import { LoginComponent       } from './auth/login/login.component';
import { DashboardResolver    } from './shared/resolvers/dashboard.resolver';
import { MercadoPanelListarComponent } from '../app/mercado/panel/mercado-panel-listar/mercado-panel-listar.component';
import { ExtranetGuard } from './extranet/extranet.guard';

const routes: Routes = [
    {
        path       : '',
        pathMatch  : 'full',
        redirectTo : 'app'
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    /** 
     * Esta ruta quedó así por error, 
     * redirige a app/extranet/login/:token.
     * 
     * No quitar ni cambiar
     **/
    {
        path        : 'app/saldos/:token',
        redirectTo  : 'app/extranet/login/:token',
        canActivate : [ ExtranetGuard ],
    },
    {
        path             : 'app/extranet',
        canActivate      : [ ExtranetGuard ],
        canActivateChild : [ ExtranetGuard ],
        component        : DashboardExtranetComponent,
        children: [{
            path         : '',
            loadChildren : () => import('./extranet/extranet.module').then(m => m.ExtranetModule),
        }],
    },
    {
        path             : 'app',
        component        : DashboardComponent,
        canActivate      : [ LoginGuard ],
        canActivateChild : [ RouteGuard ],
        resolve          : { state: DashboardResolver, },
        children: [
            {
                path:'',
                component: MercadoPanelListarComponent,
            },
            {
                path: 'oficinas',
                loadChildren: () => import('./oficinas/oficinas.module').then(m => m.OficinasModule),
            },
            {
                path: 'usuarios',
                loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule),
            },
            {
                path: 'productos',
                loadChildren: () => import('./productos/productos.module').then(m => m.ProductosModule),
            },
            {
                path: 'productos-calidades',
                loadChildren: () => import('./productos-calidades/productos-calidades.module').then(m => m.ProductosCalidadesModule),
            },
            {
                path: 'clientes',
                loadChildren: () => import('./clientes/clientes.module').then(m => m.ClientesModule),
            },
            {
                path: 'puertos',
                loadChildren: () => import('./puertos/puertos.module').then(m => m.PuertosModule),
            },
            {
                path: 'mercado',
                loadChildren: () => import('./mercado/mercado.module').then(m => m.MercadoModule),
            },
            {
                path: 'gestion-saldos',
                loadChildren: () => import('./gestion-saldos/gestion-saldos.module').then(m => m.GestionSaldosModule),
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
