import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ViewChild } from '@angular/core';
let ListadoFiltradoComponent = class ListadoFiltradoComponent {
    constructor(breakPointObserver) {
        this.breakPointObserver = breakPointObserver;
        this.onClearFilters = new EventEmitter();
        this.transparent = false;
        this.displayFiltros = 'none';
    }
    ngOnInit() {
        this.breakPointObserver.observe([
            '(max-width: 768px)'
        ]).subscribe(result => {
            this.sidenavMode = result.matches ? 'over' : 'side';
            if (!result.matches) {
                this.displayFiltros = 'unset';
                this.sidenav.open();
            }
            else {
                this.sidenav.close();
            }
        });
        this.sidenav._closedStream.subscribe(() => {
            if (this.displayFiltros === 'none') {
                this.displayFiltros = 'unset';
            }
            else {
                this.displayFiltros = 'none';
            }
        });
    }
    clickClearFilters() {
        var _a;
        (_a = this.dataSource) === null || _a === void 0 ? void 0 : _a.clearFilters();
        this.onClearFilters.emit();
    }
    clickFiltrosMobile() {
        if (this.sidenav.opened) {
            this.sidenav.toggle();
            return;
        }
        if (this.displayFiltros === 'none') {
            this.displayFiltros = 'unset';
        }
        else {
            this.displayFiltros = 'none';
        }
        this.sidenav.toggle();
    }
};
__decorate([
    Input()
], ListadoFiltradoComponent.prototype, "dataSource", void 0);
__decorate([
    Output()
], ListadoFiltradoComponent.prototype, "onClearFilters", void 0);
__decorate([
    ViewChild('sidenav', { static: true })
], ListadoFiltradoComponent.prototype, "sidenav", void 0);
__decorate([
    Input()
], ListadoFiltradoComponent.prototype, "transparent", void 0);
ListadoFiltradoComponent = __decorate([
    Component({
        selector: 'app-listado-filtrado',
        templateUrl: './listado-filtrado.component.html',
        styleUrls: ['./listado-filtrado.component.scss']
    })
], ListadoFiltradoComponent);
export { ListadoFiltradoComponent };
//# sourceMappingURL=listado-filtrado.component.js.map