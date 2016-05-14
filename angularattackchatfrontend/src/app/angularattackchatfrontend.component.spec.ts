import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { AngularattackchatfrontendAppComponent } from '../app/angularattackchatfrontend.component';

beforeEachProviders(() => [AngularattackchatfrontendAppComponent]);

describe('App: Angularattackchatfrontend', () => {
  it('should create the app',
      inject([AngularattackchatfrontendAppComponent], (app: AngularattackchatfrontendAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'angularattackchatfrontend works!\'',
      inject([AngularattackchatfrontendAppComponent], (app: AngularattackchatfrontendAppComponent) => {
    expect(app.title).toEqual('angularattackchatfrontend works!');
  }));
});
