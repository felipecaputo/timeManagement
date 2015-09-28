var app = require('app');
var BrowserWindow = require('browser-window');

require('crash-reporter').start();

//keep a reference to the app windows or GC will kill it

var mainWindow = null;

app.on('window-all-closed', function () {
  //do not kill on OS X, since it is not commom
  if (process.platform != 'darwin'){
    app.quit();
  }
});

app.on('ready', function () {
  mainWindow = new BrowserWindow({width: 700, height: 992});

  mainWindow.loadUrl('file://' + __dirname + '/browser/index.html');

  // Open the DevTools.
  // mainWindow.openDevTools();

  mainWindow.on('closed', function () {
    mainWindow = null;
  })
})
