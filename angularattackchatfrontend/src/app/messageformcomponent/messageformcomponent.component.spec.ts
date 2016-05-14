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
import { MessageformcomponentComponent } from './messageformcomponent.component';

describe('Component: Messageformcomponent', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [MessageformcomponentComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([MessageformcomponentComponent],
      (component: MessageformcomponentComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(MessageformcomponentComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(MessageformcomponentComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-messageformcomponent></app-messageformcomponent>
  `,
  directives: [MessageformcomponentComponent]
})
class MessageformcomponentComponentTestController {
}

