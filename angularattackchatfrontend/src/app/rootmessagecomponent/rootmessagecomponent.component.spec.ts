import {
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  it,
  inject,
} from '@angular/core/testing';
import { ComponentFixture, TestComponentBuilder } from '@angular/compiler/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RootmessagecomponentComponent } from './rootmessagecomponent.component';

describe('Component: Rootmessagecomponent', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [RootmessagecomponentComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([RootmessagecomponentComponent],
      (component: RootmessagecomponentComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(RootmessagecomponentComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(RootmessagecomponentComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-rootmessagecomponent></app-rootmessagecomponent>
  `,
  directives: [RootmessagecomponentComponent]
})
class RootmessagecomponentComponentTestController {
}

