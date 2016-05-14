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
import { MessagelistitemcomponentComponent } from './messagelistitemcomponent.component';

describe('Component: Messagelistitemcomponent', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [MessagelistitemcomponentComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([MessagelistitemcomponentComponent],
      (component: MessagelistitemcomponentComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(MessagelistitemcomponentComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(MessagelistitemcomponentComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-messagelistitemcomponent></app-messagelistitemcomponent>
  `,
  directives: [MessagelistitemcomponentComponent]
})
class MessagelistitemcomponentComponentTestController {
}

