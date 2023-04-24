import { Component, OnInit } from '@angular/core';
import { AccessGroup       } from '../models/acceso.model';
import { NavigationService } from '../services/navigation.service';
import { UserService       } from 'src/app/auth/shared/services/user.service';
import { Router            } from '@angular/router';

@Component({
    selector    : 'app-sidenav',
    templateUrl : './sidenav.component.html',
    styleUrls   : ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

    public accessTree: any[] = [];

    constructor(
        private navigationService: NavigationService,
        private userService: UserService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.accessTree = this.userService.getAccessTree();
    }

    selectMenuItem(item: AccessGroup) {
        this.navigationService.establecerSeccion(item);
    }

    public onNodeClick(node: any) {
        this.router.navigateByUrl('/app/' + node.data.uri);
    }

}
