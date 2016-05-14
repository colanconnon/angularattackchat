import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import { AngularattackchatfrontendAppComponent, environment } from './app/';

if (environment.production) {
  enableProdMode();
}

bootstrap(AngularattackchatfrontendAppComponent, [HTTP_PROVIDERS]);
