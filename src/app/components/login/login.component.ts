import { Component, OnInit } from '@angular/core';
import { LoginCredentialsCredentials } from '../../../api';
import { AuthserviceService } from '../../services/authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginCredentials: LoginCredentialsCredentials = {email: "", password: ""};
  public email: string;
  public password: string;
  
  constructor(private auth: AuthserviceService, private router: Router) { 
    
  }

  ngOnInit() {

  }
  
  login() {
    this.loginCredentials.email = this.email;
    this.loginCredentials.password = this.password;
    this.auth.login(this.loginCredentials).subscribe(data => {
      if (data == true) {
          this.router.navigateByUrl('users');
      }
    }, err => {
      console.log(err);
    });
  }

}
