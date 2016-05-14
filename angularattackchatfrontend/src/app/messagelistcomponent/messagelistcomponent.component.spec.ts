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
import { MessagelistcomponentComponent } from './messagelistcomponent.component';

describe('Component: Messagelistcomponent', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [MessagelistcomponentComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([MessagelistcomponentComponent],
      (component: MessagelistcomponentComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(MessagelistcomponentComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(MessagelistcomponentComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-messagelistcomponent></app-messagelistcomponent>
  `,
  directives: [MessagelistcomponentComponent]
})
class MessagelistcomponentComponentTestController {
}

