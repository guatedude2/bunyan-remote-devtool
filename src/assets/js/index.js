  /* global chrome */
  chrome.devtools.panels.create(
      'Bunyan',
      null, // No icon path
      'devtool.html',
      null // no callback needed
  );