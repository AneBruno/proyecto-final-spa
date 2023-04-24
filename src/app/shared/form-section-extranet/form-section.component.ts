import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-section-extranet',
  templateUrl: './form-section.component.html',
  styleUrls: ['./form-section.component-extranet.scss']
})
export class FormSectionExtranetComponent implements OnInit {

  @Input()
  public listado : boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
