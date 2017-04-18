import { HeroAppPage } from './app.po';

describe('hero-app App', function() {
  let page: HeroAppPage;

  beforeEach(() => {
    page = new HeroAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
