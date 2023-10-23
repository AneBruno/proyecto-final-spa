import { ColumnDef } from './column-def';
export class ListadoComponent {
    constructor() {
        // public    dataSource         : ListadoDataSource<any> = LocatorService.injector.get(ListadoDataSource);
        this.columns = [];
    }
    // protected apiService         : ApiService = LocatorService.injector.get(ApiService);
    clearColumns() {
        this.columns = [];
    }
    setColumns(columns) {
        this.columns = columns;
    }
    getColumn(name) {
        let list = this.columns.filter(c => c.name === name);
        if (list.length !== 1) {
            throw new Error('No existe la columna ' + name);
        }
        return list[0];
    }
    get columnsToShow() {
        return this.columns.filter(column => column.visible).map(column => column.name);
    }
    addColumn(name, title, width, valueFn = function () { }) {
        let columnDef = new ColumnDef(name, title, width, valueFn);
        this.columns.push(columnDef);
        return columnDef;
    }
}
//# sourceMappingURL=listado.component.js.map