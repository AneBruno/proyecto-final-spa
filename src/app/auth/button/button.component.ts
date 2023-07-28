import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
      //this.authService.inicializarObsAuthState();
  }

  signInWithGoogle() {
     // this.authService.signInWithGoogle();
  }

}
