import { Component } from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {RootmessagecomponentComponent}  from './rootmessagecomponent/rootmessagecomponent.component';
import {LogincomponentComponent} from './logincomponent';

@Component({
  moduleId: module.id,
  selector: 'angularattackchatfrontend-app',
  templateUrl: 'angularattackchatfrontend.component.html',
  styleUrls: ['angularattackchatfrontend.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  {path: '/', component: RootmessagecomponentComponent, name:"Home", useAsDefault: true},
  {path: '/login', component: LogincomponentComponent ,name:'Login'}
])
export class AngularattackchatfrontendAppComponent {

}
