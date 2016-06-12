const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow

const name = 'devRant // new Rant("fml");';

function createWindow () {
  mainWindow = new BrowserWindow({
        title: name,
        movable: true,
        width: 450,
        height: 912,
        minWidth: 450,
        minHeight: 500,
        maxWidth: 640,
        fullscreenable: false,
        resizable: true,
        autoHideMenuBar: true,
        icon: __dirname + '/favicon.png'
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
