const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const app_name = 'devRant.io';
const app_title = 'devRant // new Rant("fml");';
const app_version = '1.0.1';

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    title: app_title,
    movable: true,
    width: 450,
    height: 912,
    minWidth: 450,
    minHeight: 500,
    maxWidth: 640,
    fullscreenable: false,
    resizable: true,
    autoHideMenuBar: true,
    icon: '../icon/favicon.ico'
  })

  mainWindow.loadURL('file://' + __dirname + '/index.html')
  mainWindow.setMenu(null)
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

  app.on('ready', createWindow)
  app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
    app.quit()
    }
  })
  app.on('activate', function () {
    if (mainWindow === null) {
    createWindow()
    }
  })
