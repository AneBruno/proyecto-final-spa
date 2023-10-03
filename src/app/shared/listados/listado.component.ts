import { AuthService } from 'src/app/auth/shared/services/auth.service';
import { ListadoDataSource } from '../listado.datasource';
import { ApiService        } from '../services/api.service';
import { LocatorService    } from '../services/locator.service';
import { ColumnDef         } from './column-def';

export class ListadoComponent {
    // public    dataSource         : ListadoDataSource<any> = LocatorService.injector.get(ListadoDataSource);
    public    columns            : ColumnDef[] = [];
    public rows: any[] = [];
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

    public addRow(data: { [key: string]: any }): void {
        // Verifica que se haya proporcionado un objeto de datos
        if (!data) {
          return;
        }
        // Crea una nueva fila y agrega los datos proporcionados
        const newRow: { [key: string]: any } = {};

        // Itera sobre las columnas existentes y asigna los valores de datos correspondientes
        this.columns.forEach((column) => {
        const columnName = column.name;
        newRow[columnName] = data[columnName] !== undefined ? data[columnName] : null;
        });

        // Agrega la nueva fila al conjunto de filas de datos
        this.rows.push(newRow);
    }

}