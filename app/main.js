const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
//const electronInstaller = require('electron-winstaller');

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

/**resultPromise = electronInstaller.createWindowsInstaller({
    appDirectory: '../build/devrant.io-win32-x64',
    outputDirectory: '../package/devrant.io-win32-x64',
    name: app_name,
    title: app_name,
    version: app_version,
    productName: app_name,
    authors: app_name + ' Team | [MEADOW_DEV]',
    exe: app_name + '.exe',
    iconUrl: '../icon/favicon.ico',
    loadingGif: '../icon/Installing.gif',
    noMsi: false,
    setupExe: app_name + '-setup.exe',
    setupIcon: '../favicon.ico'
  });

resultPromise.then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`));**/
