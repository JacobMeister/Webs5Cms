import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginCredentialsCredentials, AuthService, User } from '../../api';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  private user: User;

  constructor(private authService: AuthService, private storage: Storage) { }

  public init() {
    return new Observable(observer => {
      this.storage.get("currentUserToken").then((token) => {
        if (token) {
          // this.user = new User(token);
        }

        observer.next(token);
        observer.complete();
      }).catch(err => observer.error(err));
    });
  }

  public login(loginCredentials: LoginCredentialsCredentials) {
    return new Observable(observer => {
      // Login on server
      this.authService.createToken({
        credentials: {
          email: loginCredentials.email,
          password: loginCredentials.password
        }
      }).subscribe((data) => {
        // Save user in service
        // this.user = new User(data.token);
        // this.storage.set('currentUserToken', this.user.token);

        observer.next(true);
        observer.complete();
      }, err => observer.error(err));
    })
  }


}
