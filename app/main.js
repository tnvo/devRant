const electron = require('electron');
const app = electron.app;
const app_name = 'devRant.io';
const app_title = 'devRant // new Rant("fml");';
const app_version = '1.0.1';
const app_description = 'The unofficial electron app for devRant.io';
const app_menu = electron.Menu;
const BrowserWindow = electron.BrowserWindow;

const menu_content = [
  {
    label: 'Edit',
    submenu: [
      { label: 'Undo', accelerator: 'CommandOrControl+Z', role: 'undo' },
      { label: 'Redo', accelerator: 'Shift+CommandOrControl+Z', role: 'redo' },
      { type: 'separator' },
      { label: 'Cut', accelerator: 'CommandOrControl+X', role: 'cut' },
      { label: 'Copy', accelerator: 'CommandOrControl+C', role: 'copy' },
      { label: 'Paste', accelerator: 'CommandOrControl+V', role: 'paste' },
      { label: 'Select All', accelerator: 'CommandOrControl+A', role: 'selectall' }
    ]
  }, {
    label: 'View',
    submenu: [
      { label: 'Reload', accelerator: 'CommandOrControl+R', click: function(item,focusedWindow) {if (focusedWindow) focusedWindow.webContents.reload();} }
    ]
  }, {
    label: 'Window',
    role: 'window',
    submenu: [
      { label: 'Minimize', accelerator: 'CommandOrControl+M', role: 'minimize' },
      { label: 'Close', accelerator: 'CommandOrControl+W', role: 'close' }
    ]
  }
];

let mainWindow

app.on('ready', function createWindow () {
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
    autoHideMenuBar: true
  })
  app_menu.setApplicationMenu(app_menu.buildFromTemplate(menu_content));
  mainWindow.loadURL('file://' + __dirname + '/index.html')
  mainWindow.on('closed', function () {
  mainWindow = null
  })
})
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
