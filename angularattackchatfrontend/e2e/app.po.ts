export class AngularattackchatfrontendPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('angularattackchatfrontend-app h1')).getText();
  }
}
