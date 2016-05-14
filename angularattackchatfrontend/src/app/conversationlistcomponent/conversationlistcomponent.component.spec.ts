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
import { ConversationlistcomponentComponent } from './conversationlistcomponent.component';

describe('Component: Conversationlistcomponent', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [ConversationlistcomponentComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([ConversationlistcomponentComponent],
      (component: ConversationlistcomponentComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(ConversationlistcomponentComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(ConversationlistcomponentComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-conversationlistcomponent></app-conversationlistcomponent>
  `,
  directives: [ConversationlistcomponentComponent]
})
class ConversationlistcomponentComponentTestController {
}

