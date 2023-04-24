import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-buttons-bar',
    template: `
        <ng-content></ng-content>
    `,
    styles: [`
        :host {
            margin-bottom: 25px;
        }
    `]
})
export class ButtonsBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
