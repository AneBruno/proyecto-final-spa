export class ColumnDef {
    public type          : 'text' | 'number' | 'custom' | 'figure' | 'menu' | 'button' | 'checkbox' | 'input' | 'select' | 'datePicker' | 'numberInput'  = 'text';
    public align         : 'left' | 'right'  | 'center' = 'left';
    public textAlign     : 'left' | 'right'  | 'center' = 'left';
    public visible       : boolean = true;
    public icon          : string = '';
    public fnOnClick     : Function = () => {};
    public sticky        : 'start' | 'end' | 'none' = 'none';
    public selectOptions : Array<any> = [];
    private isDisabledFn : Function = () => false;
    private onChangeInputFn: Function = () => {console.log('change')};
    private onChangeSelectFn: Function = () => {console.log('change')};
    public minDate :  any = null;
    public required : boolean = false;
    public errorMessageFn : (x : any) => string = () => '';

    constructor(
        public name       : string,
        public title      : string,
        public width      : string,
        public valueFn    : Function  = function() {},
        public iconColumn : string = '',
        public titleColor : string = 'unset',
    ) {}

    public renderFn(fn: (row: any)=> any): this {
        this.valueFn = fn;
        return this;
    }

    public setAsMenu(): this {
        this.sticky = 'end';
        this.type = 'menu';
        return this;
    }

    public setAsCheckBox(): this {
        this.type = 'checkbox';
        this.sticky = 'end';
        return this;
    }

    public setAsButton(icon: string): this {
        this.type = 'button';
        this.icon = icon;
        return this;
    }

    public setAsInput() : this {
        this.type = 'input';
        return this;
    }
    public setAsNumberInput() : this {
        this.type = 'numberInput';
        return this;
    }

    public onChangeInput(row : any) : Function{
        return this.onChangeInputFn(row);
    }

    public setChangeInputFn(fn : Function) : this {
        this.onChangeInputFn = fn;
        return this;
    }

    public setAsSelect(options : Array<any> = []) : this {
        this.type = 'select';
        this.selectOptions = options;
        
        return this;
    }

    public onChangeSelect(row : any) : Function{   
        return this.onChangeSelectFn(row);
          
    }

    public setChangeSelect(fn : Function) : this {
        this.onChangeSelectFn = fn;
        return this;
    }

    public isDisabled(row : any) : boolean {
        return this.isDisabledFn(row);
    }

    public setDisabledFn(fn : Function) : this {
        this.isDisabledFn = fn;
        return this;
    }

    public setAsDatePicker(minDate?:any) : this {
        this.type = 'datePicker';
        if(minDate){
            this.minDate = minDate;
        }
        return this;
    }

    public setAsText(): this {
        this.type = 'text';
        return this;
    }

    public setAsNumber(): this {
        this.type = 'number';
        return this;
    }

    public setAsFigure(): this {
        this.type = 'figure'
        return this;
    }

    public setAsCustom(): this {
        this.type = 'custom'
        return this;
    }

    public setSticky(sticky: 'start' | 'end' | 'none') {
        this.sticky = sticky;
    }

    public hide(): this {
        this.visible = false;
        return this;
    }

    public show(): this {
        this.visible = true;
        return this;
    }

    public setWidth(value: string): this {
        this.width = value;
        return this;
    }

    public setAlign(value: 'left' | 'right' | 'center'): this {
        this.align = value;
        return this;
    }

    public setTextAlign(value: 'left' | 'right' | 'center'): this {
        this.textAlign = value;
        return this;
    }

    public setIcon(value: string): this {
        this.icon = value;
        return this;
    }

    public click(row: any): void {
        this.fnOnClick(row);
    }

    public onClick(fn: Function): this {
        this.fnOnClick = fn;
        return this;
    }

    public setOptions(options : Array<any>) : this {
        this.selectOptions = options;
        return this;
    }

    public setRequired() : this {
        this.required = true;
        return this;
    }

    public setErrorMessage(fn : (x : any) => string) : this {
        this.errorMessageFn = fn;
        return this;
    }

}
    