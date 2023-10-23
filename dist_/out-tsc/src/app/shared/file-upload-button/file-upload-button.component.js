import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
let FileUploadButtonComponent = class FileUploadButtonComponent {
    constructor() {
        this.label = 'Subir archivo';
        this.choosenFileLabel = 'Archivo elegido';
        this.change = new EventEmitter();
    }
    ngOnInit() {
    }
    onFileChange(event) {
        this.change.emit(event);
        const reader = new FileReader;
        if (event.target.files.length > 0) {
            const [file] = event.target.files;
            this.choosenFile = file;
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.choosenFileContent = reader.result;
            };
        }
    }
    getFileContent() {
        return this.choosenFileContent;
    }
    reset() {
        this.choosenFile = null;
        this.choosenFileContent = null;
    }
};
__decorate([
    Input()
], FileUploadButtonComponent.prototype, "label", void 0);
__decorate([
    Input()
], FileUploadButtonComponent.prototype, "choosenFileLabel", void 0);
__decorate([
    Output()
], FileUploadButtonComponent.prototype, "change", void 0);
FileUploadButtonComponent = __decorate([
    Component({
        selector: 'app-file-upload-button',
        templateUrl: './file-upload-button.component.html',
        styleUrls: ['./file-upload-button.component.scss']
    })
], FileUploadButtonComponent);
export { FileUploadButtonComponent };
//# sourceMappingURL=file-upload-button.component.js.map