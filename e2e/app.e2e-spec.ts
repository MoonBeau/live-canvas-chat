import { LiveCanvasChatPage } from './app.po';

describe('live-canvas-chat App', function() {
  let page: LiveCanvasChatPage;

  beforeEach(() => {
    page = new LiveCanvasChatPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
