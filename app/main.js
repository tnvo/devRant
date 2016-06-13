const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
//var electronInstaller = require('electron-winstaller');

const app_name = 'devRant.io';
const app_title = 'devRant // new Rant("fml");';
const app_version = '1.0.1';
const app_description = 'The unofficial electron app for devRant.io';

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

  /**resultPromise = electronInstaller.createWindowsInstaller({
    appDirectory: '.',
    outputDirectory: '/dist/win',
    loadingGif: '/build/loadingGif.gif',
    authors: app_name + ' Team | [MEADOW_DEV]',
    exe: app_name + '.exe',
    description: app_description,
    version: app_version,
    title: app_title,
    iconUrl: 'https://raw.githubusercontent.com/Meadowcottage/Devrant.io/master/icon/favicon.ico',
    setupIcon: 'https://raw.githubusercontent.com/Meadowcottage/Devrant.io/master/icon/favicon.ico',
    setupExe: app_name + '-' + app_version + '-setup.exe',
    noMsi: true,
    remoteReleases: 'https://github.com/Meadowcottage/Devrant.io'
  });**/
