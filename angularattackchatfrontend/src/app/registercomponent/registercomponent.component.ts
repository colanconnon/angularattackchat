import { Component, OnInit, AfterViewInit } from '@angular/core';
import {RegisterService} from '../Services/Register.service';
import { RouteParams, Router } from '@angular/router-deprecated';

declare var componentHandler;
@Component({
  moduleId: module.id,
  selector: 'app-registercomponent',
  templateUrl: 'registercomponent.component.html',
  styleUrls: ['registercomponent.component.css'],
  providers: [RegisterService]
})
export class RegistercomponentComponent implements OnInit, AfterViewInit {
  private username: string;
  private password: string;
  private confirmPassword: string;
  
  constructor(private registerService: RegisterService,
              private router: Router) {}

  ngOnInit() {
  }
  ngAfterViewInit() {
        componentHandler.upgradeAllRegistered();
  }
  
  Register() {
    
    this.registerService.Register(this.username, this.password, this.confirmPassword).subscribe((result) => {
      console.log(result);
      var snackbar = <any> document.querySelector("#register_snackbar");
      
      var data = {
        message: 'You are now registered with username: ' + result.username ,
        timeout: 3000
      };
      snackbar.MaterialSnackbar.showSnackbar(data);
    }, (error) => {
      var snackbar = <any> document.querySelector("#register_snackbar");
      
      var data = {
        message: 'Error registering, please check all fields and try again',
        timeout: 3000
      };
      snackbar.MaterialSnackbar.showSnackbar(data);
      this.router.navigate(["Login"]);
    });
  }
  
  goToLogin() {
    this.router.navigate(["Login"]);
  }

}
