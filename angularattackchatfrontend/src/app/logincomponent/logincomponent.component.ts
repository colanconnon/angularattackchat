import { Component, OnInit, AfterViewInit } from '@angular/core';
import {LoginService} from '../Services/Login.service';
import { RouteParams, Router } from '@angular/router-deprecated';

declare var componentHandler;

@Component({
  moduleId: module.id,
  selector: 'app-logincomponent',
  templateUrl: 'logincomponent.component.html',
  styleUrls: ['logincomponent.component.css'],
  providers: [LoginService]
})
export class LogincomponentComponent implements OnInit, AfterViewInit {
  private username: string;
  private password: string;
  
  constructor(private loginService : LoginService
  , private router: Router) {
    
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
        componentHandler.upgradeAllRegistered();
  }
  Login() {
    console.log(this.username + " " + this.password);
    this.loginService.Login(this.username, this.password).subscribe( (result) => {
      var snackbar = <any> document.querySelector("#login_snackbar");
      
      var data = {
        message: 'You are now logged in',
        timeout: 3000
      };
      snackbar.MaterialSnackbar.showSnackbar(data);
      this.router.navigate(['Home']);
    }, (error) => {
      var snackbar = <any> document.querySelector("#login_snackbar");
      
      var data = {
        message: 'Error logging in, check your username and password and try again',
        timeout: 3000
      };
      snackbar.MaterialSnackbar.showSnackbar(data);
  });
  }
  
  goToRegister() {
    this.router.navigate(["Register"]);
  }

}
