//Electron
const electron = require('electron');
const browserWindow = electron.BrowserWindow;
const menu = electron.Menu;

//App Info
const app = electron.app;
const app_name = 'devRant';
const app_title = 'devRant // new Rant("fml");';
const app_version = '1.0.4';
const app_description = 'The unofficial electron app for devRant';

// Main App Window
let mainWindow

// Chooses titleBarStyle based on OS
var app_titleBarStyle;

app.on('ready', function createWindow() {
  // If OS is Darwin(MacOS)
  if (process.platform == 'darwin') {
    app_titleBarStyle = 'hidden-inset';
    menu.setApplicationMenu(require('./lib/menu_osx.js'));
  } else {
    app_titleBarStyle = 'default';
    menu.setApplicationMenu(require('./lib/menu_win.js'));
  }
  mainWindow = new browserWindow({
  title: app_title,
  titleBarStyle: app_titleBarStyle,
  backgroundColor: '#40415a',
  movable: true,
  width: 450,
  height: 912,
  minWidth: 450,
  minHeight: 500,
  maxWidth: 640,
  fullscreenable: false,
  resizable: true,
  autoHideMenuBar: true
  })
  mainWindow.loadURL('file://' + __dirname + '/index.html')
  mainWindow.on('closed', function() {
    mainWindow = null
  })
})
app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate', function() {
  if (mainWindow === null) {
    createWindow()
  }
})
