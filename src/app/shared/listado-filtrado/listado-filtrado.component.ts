import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BreakpointObserver    } from '@angular/cdk/layout';
import { OnInit                } from '@angular/core';
import { ViewChild             } from '@angular/core';
import { MatSidenav            } from '@angular/material/sidenav';
import { ListadoDataSource     } from '../listado.datasource';

@Component({
    selector    :   'app-listado-filtrado',
    templateUrl :   './listado-filtrado.component.html',
    styleUrls   : [ './listado-filtrado.component.scss' ]
})
export class ListadoFiltradoComponent implements OnInit {

    @Input()
    public dataSource: ListadoDataSource<any>;

    @Output()
    public onClearFilters: EventEmitter<void> = new EventEmitter<void>();

    @ViewChild('sidenav', { static: true })
    public sidenav: MatSidenav;

    @Input()
    public transparent : boolean = false;

    public sidenavMode : string;

    public displayFiltros : string = 'none';

    constructor(
        private breakPointObserver : BreakpointObserver,
    ) { }

    ngOnInit(): void {
        this.breakPointObserver.observe([
            '(max-width: 768px)'
        ]).subscribe(result => {
            this.sidenavMode = result.matches ? 'over' : 'side';

            if (!result.matches) {
                this.displayFiltros ='unset';
                this.sidenav.open();
            } else {
                this.sidenav.close();
            }
        });

        this.sidenav._closedStream.subscribe(()=>{
            if(this.displayFiltros === 'none'){
                this.displayFiltros = 'unset';
            }
            else{
                this.displayFiltros = 'none';
            }
        })

    }

    public clickClearFilters() {
        this.dataSource?.clearFilters();
        this.onClearFilters.emit();
    }

    

    public clickFiltrosMobile() {
        if(this.sidenav.opened){
            this.sidenav.toggle();
            return;
        }
        if(this.displayFiltros === 'none'){
            this.displayFiltros = 'unset';
        }
        else{
            this.displayFiltros = 'none';
        }
        this.sidenav.toggle()
    }

}
