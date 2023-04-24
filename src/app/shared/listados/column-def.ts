export class ColumnDef {
    public type    : 'text' | 'number' | 'custom' | 'figure' | 'menu' = 'text';
    public align   : 'left' | 'right'  | 'center' = 'left';
    public visible : boolean = true;

    constructor(
        public name    : string,
        public title   : string,
        public width   : string,
        public valueFn : Function  = function() {},
    ) {}

    public renderFn(fn: (row: any)=> any): ColumnDef {
        this.valueFn = fn;
        return this;
    }

    public setAsMenu(): ColumnDef {
        this.type = 'menu';
        return this;
    }

    public setAsText(): ColumnDef {
        this.type = 'text';
        return this;
    }

    public setAsNumber(): ColumnDef {
      this.type = 'number';
      return this;
    }

    public setAsFigure(): ColumnDef {
      this.type = 'figure'
      return this;
    }

    public setAsCustom(): ColumnDef {
      this.type = 'custom'
      return this;
    }

    public hide(): ColumnDef {
        this.visible = false;
        return this;
    }

    public show(): ColumnDef {
        this.visible = true;
        return this;
    }

    public setWidth(value: string): ColumnDef {
        this.width = value;
        return this;
    }

    public setAlign(value: 'left' | 'right' | 'center'): ColumnDef {
        this.align = value;
        return this;
    }
}
