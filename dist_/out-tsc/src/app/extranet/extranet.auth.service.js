import { __awaiter, __decorate } from "tslib";
import { Injectable } from "@angular/core";
import { User } from "../shared/models/user.model";
let ExtranetAuthService = class ExtranetAuthService {
    constructor(apiService, userService) {
        this.apiService = apiService;
        this.userService = userService;
        this.loginData = {};
        this.token = '';
        this.isValid = false;
    }
    login(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.loginData = yield this.apiService.getData('/extranet/auth/login', { token: token }).toPromise();
            }
            catch (e) {
                return false;
            }
            this.syncUserService();
            this.isValid = true;
            return true;
        });
    }
    syncUserService() {
        let user = new User;
        user.id = 0;
        user.email = this.loginData.Usuario.Email;
        user.nombre = this.loginData.Usuario.Nombre;
        this.userService.setUser(user);
    }
    getIsValid() {
        return this.isValid;
    }
    getToken() {
        if (!this.token) {
            this.token = localStorage.getItem('extranet.token');
        }
        return this.token;
    }
    storeToken(token) {
        localStorage.setItem('extranet.token', token);
        this.token = token;
    }
    getLoginData() {
        return this.loginData;
    }
    logout() {
        localStorage.removeItem('extranet.token');
        this.loginData = {};
        this.token = '';
        this.isValid = false;
    }
    obtenerRol() {
        return this.loginData.Usuario.TipoUsuario;
    }
};
ExtranetAuthService = __decorate([
    Injectable({ providedIn: 'root' })
], ExtranetAuthService);
export { ExtranetAuthService };
// GET  extranet/auth/login
// POST extranet/solicitudes-cobro
// GET  extranet/solicitudes-cobro
// GET  extranet/solicitudes-cbu
// POST extranet/solicitudes-cbu
//# sourceMappingURL=extranet.auth.service.js.map