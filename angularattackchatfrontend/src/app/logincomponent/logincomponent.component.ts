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
      console.log(result);
      this.router.navigate(['Home']);
    });
  }

}
