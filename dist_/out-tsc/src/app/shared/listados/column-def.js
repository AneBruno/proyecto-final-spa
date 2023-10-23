export class ColumnDef {
    constructor(name, title, width, valueFn = function () { }) {
        this.name = name;
        this.title = title;
        this.width = width;
        this.valueFn = valueFn;
        this.type = 'text';
        this.align = 'left';
        this.visible = true;
    }
    renderFn(fn) {
        this.valueFn = fn;
        return this;
    }
    setAsMenu() {
        this.type = 'menu';
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
}
//# sourceMappingURL=column-def.js.map