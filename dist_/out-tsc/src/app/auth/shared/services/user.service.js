import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
let UserService = class UserService {
    constructor(apiService) {
        this.apiService = apiService;
        this.user$ = new Subject();
        this.accesos = [];
    }
    isAuthenticated() {
        return this.getAccessToken() !== null;
    }
    removeSessionData() {
        localStorage.removeItem('accessToken');
    }
    getAccessToken() {
        return localStorage.getItem('accessToken');
    }
    setAccessToken(value) {
        localStorage.setItem('accessToken', value);
    }
    setUser(value) {
        this.user = value;
        this.accesos = this.user.accesos;
        this.user$.next(value);
    }
    getUser() {
        return this.user;
    }
    getUser$() {
        return this.user$;
    }
    fetchUserAsync() {
        return new Promise((resolve) => {
            if (this.user) {
                resolve(this.user);
                return;
            }
            resolve(this.apiService.getData('/auth/getUser').pipe(tap(user => this.setUser(user))).toPromise());
        });
    }
    getAccessGroups() {
        let accesos = (this.accesos || []).filter(u => u.tipo === 'menu');
        // Esto es para que ordene los grupos de menus
        accesos = this.sortAcceses(accesos);
        //@ts-ignore
        const groupedAcceses = this.groupBy(accesos, 'grupo');
        for (const [key, value] of Object.entries(groupedAcceses)) {
            // Esto es para que ordene los items dentro de cada grupo.
            groupedAcceses[key] = this.sortAcceses(value);
        }
        return groupedAcceses;
    }
    sortAcceses(accessGroup) {
        return accessGroup.sort((a, b) => { var _a, _b; return ((_a = a.orden) !== null && _a !== void 0 ? _a : 99) - ((_b = b.orden) !== null && _b !== void 0 ? _b : 99); });
    }
    getAccessTree() {
        let groups = this.getAccessGroups();
        let treeData = [];
        for (let groupName in groups) {
            let hijos = groups[groupName];
            treeData.push({
                nombre: groupName,
                hijos: hijos,
            });
        }
        treeData.sort((a, b) => a.nombre < b.nombre ? -1 : a.nombre > b.nombre ? 1 : 0);
        return treeData;
    }
    groupBy(arrayToGroupBy, key) {
        const groupedArray = {};
        if (arrayToGroupBy != undefined) {
            arrayToGroupBy.map(x => {
                groupedArray[x[key]] = groupedArray[x[key]] || [];
                groupedArray[x[key]].push(x);
            });
        }
        return groupedArray;
    }
};
UserService = __decorate([
    Injectable()
], UserService);
export { UserService };
//# sourceMappingURL=user.service.js.map