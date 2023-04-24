import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Injectable  } from "@angular/core";
import { UserService } from "src/app/auth/shared/services/user.service";
import { User        } from "../models/user.model";
import { ApiService  } from "../services/api.service";
import { Observable, of } from "rxjs";

@Injectable()
export class DashboardResolver implements Resolve<User | Promise<User>> {

    public constructor(
        private userService: UserService, 
        private apiService : ApiService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<User | Promise<User>> {
        return  this.userService.fetchUserAsync();
    }
}