chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('popup.html', {
      'outerBounds': {
        'width': 400,
        'height': 500
      }
    });
  });