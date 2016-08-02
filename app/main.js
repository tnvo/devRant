//Electron
const electron = require('electron');

//App Info
const app = electron.app;
const app_name = 'devRant';
const app_title = 'devRant // new Rant("fml");';
const app_version = '1.0.4';
const app_description = 'The unofficial electron app for devRant';
const app_menu = electron.Menu;

// App Window
const BrowserWindow = electron.BrowserWindow;

//Update Downloader
require('electron-dl')();

//General Menu Contents
const menu_content = [{
    label: 'Edit',
    submenu: [{
        label: 'Undo',
        accelerator: 'CommandOrControl+Z',
        role: 'undo'
    }, {
        label: 'Redo',
        accelerator: 'Shift+CommandOrControl+Z',
        role: 'redo'
    }, {
        type: 'separator'
    }, {
        label: 'Cut',
        accelerator: 'CommandOrControl+X',
        role: 'cut'
    }, {
        label: 'Copy',
        accelerator: 'CommandOrControl+C',
        role: 'copy'
    }, {
        label: 'Paste',
        accelerator: 'CommandOrControl+V',
        role: 'paste'
    }, {
        label: 'Select All',
        accelerator: 'CommandOrControl+A',
        role: 'selectall'
    }]
}, {
    label: 'View',
    submenu: [
        //{ label: 'Forward', accelerator: 'CommandOrControl+Right', click: function(item,focusedWindow) {if (focusedWindow) focusedWindow.webContents.goForward();} },
        {
            label: 'Back',
            accelerator: 'CommandOrControl+Left',
            click: function(item, focusedWindow) {
                if (focusedWindow) focusedWindow.webContents.goBack();
                focusedWindow.webContents.reload()
            }
        }, {
            type: 'separator'
        }, {
            label: 'Reload',
            accelerator: 'CommandOrControl+R',
            click: function(item, focusedWindow) {
                if (focusedWindow) focusedWindow.webContents.reload();
            }
        }
    ]
}, {
    label: 'Window',
    role: 'window',
    submenu: [{
        label: 'Minimize',
        accelerator: 'CommandOrControl+M',
        role: 'minimize'
    }, {
        label: 'Close',
        accelerator: 'CommandOrControl+W',
        role: 'close'
    }]
}, {
    label: 'Help',
    role: 'help',
    submenu: [{
        label: 'About devRant',
        click: function() {
            require('electron').shell.openExternal("https://github.com/Meadowcottage/devRant/releases/tag/" + app_version)
        }
    }, {
        label: 'View devRant',
        click: function() {
            require('electron').shell.openExternal("https://devrant.io")
        }
    }, {
        type: 'separator'
    }, {
        label: 'Changelog',
        click: function() {
            require('electron').shell.openExternal("https://github.com/Meadowcottage/devRant/releases/tag/" + app_version)
        }
    }]
}];

//Menu Contents for MacOS ONLY
const darwin_menu_content = [{
    label: 'Application',
    submenu: [{
        label: 'Hide ' + app_name,
        accelerator: 'Command+H',
        role: 'hide'
    }, {
        label: 'Hide Others',
        accelerator: 'Command+Shift+H',
        role: 'hideothers'
    }, {
        type: 'separator'
    }, {
        label: 'Quit',
        accelerator: 'Command+Q',
        click: function() {
            app.quit();
        }
    }]
}, {
    label: 'Edit',
    submenu: [{
        label: 'Undo',
        accelerator: 'CommandOrControl+Z',
        role: 'undo'
    }, {
        label: 'Redo',
        accelerator: 'Shift+CommandOrControl+Z',
        role: 'redo'
    }, {
        type: 'separator'
    }, {
        label: 'Cut',
        accelerator: 'CommandOrControl+X',
        role: 'cut'
    }, {
        label: 'Copy',
        accelerator: 'CommandOrControl+C',
        role: 'copy'
    }, {
        label: 'Paste',
        accelerator: 'CommandOrControl+V',
        role: 'paste'
    }, {
        label: 'Select All',
        accelerator: 'CommandOrControl+A',
        role: 'selectall'
    }]
}, {
    label: 'View',
    submenu: [
        //{ label: 'Forward', accelerator: 'CommandOrControl+Right', click: function(item,focusedWindow) {if (focusedWindow) focusedWindow.webContents.goForward(; focusedWindow.webContents.reload();} },
        {
            label: 'Back',
            accelerator: 'CommandOrControl+Left',
            click: function(item, focusedWindow) {
                if (focusedWindow) focusedWindow.webContents.goBack();
                focusedWindow.webContents.reload();
            }
        }, {
            type: 'separator'
        }, {
            label: 'Reload',
            accelerator: 'CommandOrControl+R',
            click: function(item, focusedWindow) {
                if (focusedWindow) focusedWindow.webContents.reload();
            }
        }
    ]
}, {
    label: 'Window',
    role: 'window',
    submenu: [{
        label: 'Minimize',
        accelerator: 'CommandOrControl+M',
        role: 'minimize'
    }, {
        label: 'Close',
        accelerator: 'CommandOrControl+W',
        role: 'close'
    }]
}, {
    label: 'Help',
    role: 'help',
    submenu: [{
        label: 'About devRant',
        click: function() {
            require('electron').shell.openExternal("https://github.com/Meadowcottage/devRant/releases/tag/" + app_version)
        }
    }, {
        label: 'View devRant',
        click: function() {
            require('electron').shell.openExternal("https://devrant.io")
        }
    }, {
        type: 'separator'
    }, {
        label: 'Changelog',
        click: function() {
            require('electron').shell.openExternal("https://github.com/Meadowcottage/devRant/releases/tag/" + app_version)
        }
    }]
}];

// Main App Window
let mainWindow

// Chooses titleBarStyle based on OS
var app_titleBarStyle;

// Chooses menu to load based on OS
var app_OS_menu;

// If OS is Darwin(MacOS)
if (process.platform == 'darwin') {
    app_titleBarStyle = 'hidden-inset';
    app_OS_menu = darwin_menu_content;
} else {
    app_titleBarStyle = 'default';
    app_OS_menu = menu_content;
}

app.on('ready', function createWindow() {
    mainWindow = new BrowserWindow({
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
    app_menu.setApplicationMenu(app_menu.buildFromTemplate(app_OS_menu))
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
