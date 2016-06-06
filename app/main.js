const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
        title: 'devRant.io',
        movable: true,
        width: 470,
        height: 840,
        minWidth: 320,
        minHeight: 500,
        maxWidth: 640,
        titleBarStyle: 'hidden-inset',
        fullscreenable: false,
        resizable: true,
        skipTaskbar: true,
        autoHideMenuBar: true,
        icon: __dirname + '../icon/favicon.icns'
 })

  mainWindow.loadURL('file://' + __dirname + '/index.html')
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
