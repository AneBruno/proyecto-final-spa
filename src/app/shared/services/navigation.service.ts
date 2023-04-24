import { Injectable      } from "@angular/core";
import { Location        } from "@angular/common";
import { NavigationEnd   } from "@angular/router";
import { Router          } from "@angular/router";
import { BehaviorSubject } from 'rxjs';
import { Observable      } from 'rxjs';
import { AccessGroup     } from '../models/acceso.model';

@Injectable()
export class NavigationService {
    private currentSection : BehaviorSubject<AccessGroup> = new BehaviorSubject<AccessGroup>(null);
    private history        : string[] = []
    public  current$       : Observable<AccessGroup> = this.currentSection.asObservable();

    establecerSeccion(item: AccessGroup) {
        this.currentSection.next(item);
    }

    constructor(private router: Router, private location: Location) {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.history.push(event.urlAfterRedirects)
            }
        });
    }
  
    back(): void {
        this.history.pop()
        if (this.history.length > 0) {
            this.location.back();
        } else {
            this.router.navigateByUrl('/')
        }
    }
}