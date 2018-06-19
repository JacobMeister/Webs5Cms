import { Component, OnInit } from '@angular/core';
import { LoginCredentialsCredentials } from '../../../api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginCredentials: LoginCredentialsCredentials = {email: "", password: ""};
  
  constructor() { 
    
  }

  ngOnInit() {

  }

}
