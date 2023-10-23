export class ColumnDef {
    constructor(name, title, width, valueFn = function () { }, iconColumn = '', titleColor = 'unset') {
        this.name = name;
        this.title = title;
        this.width = width;
        this.valueFn = valueFn;
        this.iconColumn = iconColumn;
        this.titleColor = titleColor;
        this.type = 'text';
        this.align = 'left';
        this.textAlign = 'left';
        this.visible = true;
        this.icon = '';
        this.fnOnClick = () => { };
        this.sticky = 'none';
        this.selectOptions = [];
        this.isDisabledFn = () => false;
        this.onChangeInputFn = () => { console.log('change'); };
        this.onChangeSelectFn = () => { console.log('change'); };
        this.minDate = null;
        this.required = false;
        this.errorMessageFn = () => '';
    }
    renderFn(fn) {
        this.valueFn = fn;
        return this;
    }
    setAsMenu() {
        this.sticky = 'end';
        this.type = 'menu';
        return this;
    }
    setAsCheckBox() {
        this.type = 'checkbox';
        this.sticky = 'end';
        return this;
    }
    setAsButton(icon) {
        this.type = 'button';
        this.icon = icon;
        return this;
    }
    setAsInput() {
        this.type = 'input';
        return this;
    }
    setAsNumberInput() {
        this.type = 'numberInput';
        return this;
    }
    onChangeInput(row) {
        return this.onChangeInputFn(row);
    }
    setChangeInputFn(fn) {
        this.onChangeInputFn = fn;
        return this;
    }
    setAsSelect(options = []) {
        this.type = 'select';
        this.selectOptions = options;
        return this;
    }
    onChangeSelect(row) {
        return this.onChangeSelectFn(row);
    }
    setChangeSelect(fn) {
        this.onChangeSelectFn = fn;
        return this;
    }
    isDisabled(row) {
        return this.isDisabledFn(row);
    }
    setDisabledFn(fn) {
        this.isDisabledFn = fn;
        return this;
    }
    setAsDatePicker(minDate) {
        this.type = 'datePicker';
        if (minDate) {
            this.minDate = minDate;
        }
        return this;
    }
    setAsText() {
        this.type = 'text';
        return this;
    }
    setAsNumber() {
        this.type = 'number';
        return this;
    }
    setAsFigure() {
        this.type = 'figure';
        return this;
    }
    setAsCustom() {
        this.type = 'custom';
        return this;
    }
    setSticky(sticky) {
        this.sticky = sticky;
    }
    hide() {
        this.visible = false;
        return this;
    }
    show() {
        this.visible = true;
        return this;
    }
    setWidth(value) {
        this.width = value;
        return this;
    }
    setAlign(value) {
        this.align = value;
        return this;
    }
    setTextAlign(value) {
        this.textAlign = value;
        return this;
    }
    setIcon(value) {
        this.icon = value;
        return this;
    }
    click(row) {
        this.fnOnClick(row);
    }
    onClick(fn) {
        this.fnOnClick = fn;
        return this;
    }
    setOptions(options) {
        this.selectOptions = options;
        return this;
    }
    setRequired() {
        this.required = true;
        return this;
    }
    setErrorMessage(fn) {
        this.errorMessageFn = fn;
        return this;
    }
}
//# sourceMappingURL=column-def.js.map