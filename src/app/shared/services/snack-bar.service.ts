import { Injectable       } from "@angular/core";
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class SnackBarService {

    public constructor(
        private _snackBar: MatSnackBar
    ) { }

    public show(message: string): MatSnackBarRef<SimpleSnackBar> {
        return this._snackBar.open(message, 'Ok', {
            duration: 2000,
            horizontalPosition: 'end',
            verticalPosition: 'bottom'
        });
    }
}