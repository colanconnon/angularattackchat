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
import { MessageformcomponenComponent } from './messageformcomponen.component';

describe('Component: Messageformcomponen', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [MessageformcomponenComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([MessageformcomponenComponent],
      (component: MessageformcomponenComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(MessageformcomponenComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(MessageformcomponenComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-messageformcomponen></app-messageformcomponen>
  `,
  directives: [MessageformcomponenComponent]
})
class MessageformcomponenComponentTestController {
}

