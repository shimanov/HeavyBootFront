import { HBPage } from './app.po';

describe('hb App', () => {
  let page: HBPage;

  beforeEach(() => {
    page = new HBPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
