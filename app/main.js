//Electron
const electron = require('electron');
const globalShortcut = electron.globalShortcut;
const browserWindow = electron.BrowserWindow;
const menu = electron.Menu;

//App Info
const app = electron.app;
const app_name = app.getName();
const app_title = app.getName() + ' // new Rant("fml");';
const app_version = app.getVersion();
const app_description = 'The unofficial electron app for devRant';

// Main App Window
let mainWindow

app.on('ready', function createWindow() {
  mainWindow = new browserWindow({
  title: app_title,
  titleBarStyle: 'hidden-inset',
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
  menu.setApplicationMenu(require('./menu.js'));
  mainWindow.loadURL('file://' + __dirname + '/index.html')
  mainWindow.on('closed', function() {
    mainWindow = null
  })

  //Shortcut
  globalShortcut.register('Control+R', () => {
    mainWindow.webContents.reload();
  })
  globalShortcut.register('CmdOrCtrl+Left', () => {
    mainWindow.webContents.goBack();
    mainWindow.webContents.reload();
  })

  mainWindow.on('app-command', (e, cmd) => {
    // Navigate the window back when the user hits their mouse back button
    if (cmd === 'browser-backward' && mainWindow.webContents.canGoBack()) {
      mainWindow.webContents.goBack()
    }
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
