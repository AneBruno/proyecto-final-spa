import { Observable       } from "rxjs";
import { Injectable       } from "@angular/core";
import { MatDialog,       } from '@angular/material/dialog';
import { MessageComponent } from "../message/message.component";

@Injectable()
export class MessagesService {

    public constructor(
        private dialog: MatDialog,
    ) { }

    public show(message: string, align : 'center' | 'end' | 'start' = 'end', textoBoton = 'Cerrar'): Observable<void> {
        return this.dialog.open(MessageComponent,  {
            disableClose : false,
            autoFocus    : true,
            data         : { 
                message    : message,
                align      : align,
                textoBoton : textoBoton
            }
        }).afterClosed();
    }
}