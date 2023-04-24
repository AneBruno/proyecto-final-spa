import { Injectable  } from "@angular/core";
import { UserService } from "../auth/shared/services/user.service";
import { User        } from "../shared/models/user.model";
import { ApiService  } from "../shared/services/api.service";

@Injectable({providedIn: 'root'})
export class ExtranetAuthService {

    private loginData : any = {};
    private token     : string = '';
    private isValid   : boolean = false;

    public constructor(
        private apiService : ApiService,
        private userService : UserService,
    ) {

    }

    public async login(token: string) {

        try {
            this.loginData = await this.apiService.getData('/extranet/auth/login', { token: token }).toPromise();
        } catch (e) {
            return false;
        }

        this.syncUserService();
        this.isValid = true;

        return true;
    }

    private syncUserService() {
        let user    = new User;
        user.id     = 0;
        user.email  = this.loginData.Usuario.Email;
        user.nombre = this.loginData.Usuario.Nombre;
        this.userService.setUser(user);
    }

    public getIsValid() {
        return this.isValid;
    }

    public getToken() {
        if (!this.token) {
            this.token = localStorage.getItem('extranet.token');
        }
        return this.token;
    }

    public storeToken(token: string) {
        localStorage.setItem('extranet.token', token);
        this.token = token;
    }

    public getLoginData() {
        return this.loginData;
    }

    public logout() {
        localStorage.removeItem('extranet.token');
        this.loginData = {};
        this.token = '';
        this.isValid = false;
        
    }

    public obtenerRol() {
        return this.loginData.Usuario.TipoUsuario;
    }
}

// GET  extranet/auth/login
// POST extranet/solicitudes-cobro
// GET  extranet/solicitudes-cobro
// GET  extranet/solicitudes-cbu
// POST extranet/solicitudes-cbu