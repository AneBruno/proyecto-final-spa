import { Observable       } from "rxjs";
import { Injectable       } from "@angular/core";
import { MatDialog,       } from '@angular/material/dialog';
import { ConfirmComponent } from '../confirm/confirm.component';
import { ConfirmYesNoComponent } from "../confirmYesNo/confirm.component";

@Injectable()
export class ConfirmService {

    public constructor(
        private dialog: MatDialog,
    ) { }

    public ask(message: string): Observable<void> {
        return this.dialog.open(ConfirmComponent,  {
            disableClose : false,
            autoFocus    : true,
            data         : { 
                message: message,
            }
        }).componentInstance.confirm;
    }

    public askfForYesNo(message: string): Observable<void> {
        return this.dialog.open(ConfirmYesNoComponent,  {
            disableClose : false,
            autoFocus    : true,
            data         : { 
                message: message,
            }
        }).componentInstance.confirm;
    }

    public async askAsync(message: string): Promise<void> {
        return new Promise((resolve) => {
            this.ask(message).subscribe(() => {
                resolve();
            });
        });
    }
}