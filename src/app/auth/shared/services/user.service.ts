import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AccesoInterface, AccessGroup } from 'src/app/shared/models/acceso.model';
import { User } from 'src/app/shared/models/user.model';
import { ApiService } from 'src/app/shared/services/api.service';


@Injectable()
export class UserService {

    private user: any;
    private user$: Subject<any> = new Subject<any>();
    public accesos: any[] = [];
    
    constructor(
        private apiService: ApiService,
    ) {
    }


    public isAuthenticated(): boolean {
        return this.getAccessToken() !== null;
    }

    public removeSessionData() {
        localStorage.removeItem('accessToken');
    }

    public getAccessToken() {
        return localStorage.getItem('accessToken');
    }

    public setAccessToken(value: string) {
        localStorage.setItem('accessToken', value);
    }

    public setUser(value: any) {
        this.user = value;
        this.accesos = this.user.accesos;
        this.user$.next(value);
    }

    public getUser(): User {
        return this.user;
    }

    public getUser$(): Observable<any> {
        return this.user$;
    }

    public fetchUserAsync(): Promise<User | Promise<User>> {
        return new Promise<User | Promise<User>>((resolve) => {
            
            if (this.user) {
                resolve(this.user);
                return;
            }
            
            resolve(this.apiService.getData('/auth/getUser').pipe(
                tap(user => this.setUser(user))
            ).toPromise<User>());
        });
    }

    public getAccessGroups() {
        let accesos = (this.accesos||[]).filter(u=>u.tipo === 'menu');

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

    public sortAcceses(accessGroup: AccesoInterface[]) {
        return accessGroup.sort((a, b) => (a.orden ?? 99) - (b.orden ?? 99));
    }

    public getAccessTree(): any[] {
        let groups = this.getAccessGroups();
        
        let treeData = [];
        for(let groupName in groups) {
            let hijos = groups[groupName];
            treeData.push({
                nombre: groupName,
                hijos: hijos,
            });
        }

        treeData.sort((a, b) => a.nombre < b.nombre ? -1 : a.nombre > b.nombre ? 1 : 0);
        return treeData;
    }

    groupBy(arrayToGroupBy: object[], key: string): AccessGroup {
        const groupedArray = {};
        
        if (arrayToGroupBy != undefined) {
            arrayToGroupBy.map(x => {
                //@ts-ignore
                groupedArray[x[key]] = groupedArray[x[key]] || [];

                //@ts-ignore
                groupedArray[x[key]].push(x)
            });
        }

        return groupedArray;
    }

    //////////////Nuevo

    
}
