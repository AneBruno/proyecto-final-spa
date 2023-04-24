import { Component       } from '@angular/core';
import { EventEmitter    } from '@angular/core';
import { Inject          } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef    } from '@angular/material/dialog';
import { OnInit          } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

    public confirm : EventEmitter<void> = new EventEmitter<void>();

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: {message: string, align : string, textoBoton : string},
        public dialogRef: MatDialogRef<MessageComponent>,        
    ) { }


    ngOnInit(): void {
    }

    close() {
        this.dialogRef.close(true);
    }

}
