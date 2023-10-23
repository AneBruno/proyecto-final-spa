import { __decorate } from "tslib";
import { Injectable } from "@angular/core";
import { NavigationEnd } from "@angular/router";
import { BehaviorSubject } from 'rxjs';
let NavigationService = class NavigationService {
    constructor(router, location) {
        this.router = router;
        this.location = location;
        this.currentSection = new BehaviorSubject(null);
        this.history = [];
        this.current$ = this.currentSection.asObservable();
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.history.push(event.urlAfterRedirects);
            }
        });
    }
    establecerSeccion(item) {
        this.currentSection.next(item);
    }
    back() {
        this.history.pop();
        if (this.history.length > 0) {
            this.location.back();
        }
        else {
            this.router.navigateByUrl('/');
        }
    }
};
NavigationService = __decorate([
    Injectable()
], NavigationService);
export { NavigationService };
//# sourceMappingURL=navigation.service.js.map