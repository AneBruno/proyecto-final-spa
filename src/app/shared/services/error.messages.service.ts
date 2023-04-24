import { Injectable } from "@angular/core";

@Injectable()
export class ErrorMessagesService {

    public show(message: string) {
        alert(message);
    }
}