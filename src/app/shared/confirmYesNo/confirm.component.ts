import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-yes-no.message',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmYesNoComponent implements OnInit {

    public confirm : EventEmitter<void> = new EventEmitter<void>();
    public reject  : EventEmitter<void> = new EventEmitter<void>();
    public yesNo   : boolean = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: {message: string},
        public dialogRef: MatDialogRef<ConfirmYesNoComponent>,  
        
    ) { }

    ngOnInit(): void {
    }

    clickConfirm() {
        this.dialogRef.close();
        this.confirm.emit();
    }

    clickReject() {
        this.dialogRef.close();
        this.reject.emit();
        
    }


}
