import { AuthService } from 'src/app/auth/shared/services/auth.service';
import { ListadoDataSource } from '../listado.datasource';
import { ApiService        } from '../services/api.service';
import { LocatorService    } from '../services/locator.service';
import { ColumnDef         } from './column-def';

export class ListadoComponent {
    // public    dataSource         : ListadoDataSource<any> = LocatorService.injector.get(ListadoDataSource);
    public    columns            : ColumnDef[] = [];
    // protected apiService         : ApiService = LocatorService.injector.get(ApiService);

    public clearColumns() {
        this.columns = [];
    }

    public setColumns(columns: ColumnDef[]) {
        this.columns = columns;
    }

    public getColumn(name: string): ColumnDef {
        let list = this.columns.filter(c=>c.name===name);
        if (list.length !== 1) {
            throw new Error('No existe la columna ' + name);
        }
        return list[0];
    }

    public get columnsToShow(): string[] {
        return this.columns.filter(column => column.visible).map(column => column.name);
    }

    public addColumn(name: string, title: string, width: string, valueFn : Function  = function() {}): ColumnDef {
        let columnDef = new ColumnDef(name, title, width, valueFn);
        this.columns.push(columnDef);
        return columnDef;
    }
}