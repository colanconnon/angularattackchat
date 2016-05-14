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
import { ConversationlistitemcomponentComponent } from './conversationlistitemcomponent.component';

describe('Component: Conversationlistitemcomponent', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [ConversationlistitemcomponentComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([ConversationlistitemcomponentComponent],
      (component: ConversationlistitemcomponentComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(ConversationlistitemcomponentComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(ConversationlistitemcomponentComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-conversationlistitemcomponent></app-conversationlistitemcomponent>
  `,
  directives: [ConversationlistitemcomponentComponent]
})
class ConversationlistitemcomponentComponentTestController {
}

