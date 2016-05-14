import { AngularattackchatfrontendPage } from './app.po';

describe('angularattackchatfrontend App', function() {
  let page: AngularattackchatfrontendPage;

  beforeEach(() => {
    page = new AngularattackchatfrontendPage();
  })

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('angularattackchatfrontend works!');
  });
});
