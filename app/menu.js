//Electron
const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const app = electron.app;
const app_name = app.getName();
const app_version = app.getVersion();
const app_menu = electron.Menu;

var template_win = [{
    label: 'File',
    submenu: [{
        label: 'Hide ' + app_name,
        accelerator: 'Control+H',
        role: 'hide'
    }, {
        label: 'Hide Others',
        accelerator: 'Control+Shift+H',
        role: 'hideothers'
    }, {
        type: 'separator'
    }, {
        label: 'Quit',
        accelerator: 'Control+W',
        role: 'close'
    }]
}, {
    label: 'Edit',
    submenu: [{
        label: 'Undo',
        accelerator: 'Control+Z',
        role: 'undo'
    }, {
        label: 'Redo',
        accelerator: 'Shift+Control+Z',
        role: 'redo'
    }, {
        type: 'separator'
    }, {
        label: 'Cut',
        accelerator: 'Control+X',
        role: 'cut'
    }, {
        label: 'Copy',
        accelerator: 'Control+C',
        role: 'copy'
    }, {
        label: 'Paste',
        accelerator: 'Control+V',
        role: 'paste'
    }, {
        label: 'Select All',
        accelerator: 'Control+A',
        role: 'selectall'
    }]
}, {
    label: 'View',
    submenu: [{
        label: 'Back',
        accelerator: 'Backspace',
        click: function(item, focusedWindow) {
            if (focusedWindow && focusedWindow.webContents.canGoBack())
                focusedWindow.webContents.goBack();
            focusedWindow.webContents.reload();
        }
    }, {
        type: 'separator'
    }, {
        label: 'Reload',
        accelerator: 'F5',
        click: function(item, focusedWindow) {
            if (focusedWindow) focusedWindow.webContents.reload();
        }
    }, {
        label: 'Toggle Theme',
        accelerator: 'Control+D',
        click() {
            // Some code goes here.
        }
    }]
}, {
    label: 'Window',
    role: 'window',
    submenu: [{
        label: 'Minimize',
        accelerator: 'Control+M',
        role: 'minimize'
    }, {
        label: 'Close',
        accelerator: 'Control+W',
        role: 'close'
    }]
}, {
    label: 'Help',
    role: 'help',
    submenu: [{
        label: 'About ' + app_name,
        click: function() {
            require('electron').shell.openExternal("https://github.com/Meadowcottage/devRant/releases/tag/" + app_version)
        }
    }, {
        label: 'View ' + app_name,
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

var template_osx = [{
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
        accelerator: 'Command+Z',
        role: 'undo'
    }, {
        label: 'Redo',
        accelerator: 'Shift+Command+Z',
        role: 'redo'
    }, {
        type: 'separator'
    }, {
        label: 'Cut',
        accelerator: 'Command+X',
        role: 'cut'
    }, {
        label: 'Copy',
        accelerator: 'Command+C',
        role: 'copy'
    }, {
        label: 'Paste',
        accelerator: 'Command+V',
        role: 'paste'
    }, {
        label: 'Select All',
        accelerator: 'Command+A',
        role: 'selectall'
    }]
}, {
    label: 'View',
    submenu: [
        //{ label: 'Forward', accelerator: 'CommandOrControl+Right', click: function(item,focusedWindow) {if (focusedWindow) focusedWindow.webContents.goForward(; focusedWindow.webContents.reload();} },
        {
            label: 'Back',
            accelerator: 'Command+Left',
            click: function(item, focusedWindow) {
                if (focusedWindow) focusedWindow.webContents.goBack();
                focusedWindow.webContents.reload();
            }
        }, {
            type: 'separator'
        }, {
            label: 'Reload',
            accelerator: 'Command+R',
            click: function(item, focusedWindow) {
                if (focusedWindow) focusedWindow.webContents.reload();
            }
        }, {
            label: 'Toggle Theme',
            accelerator: 'Command+D',
            click() {
                // Some code goes here.
            }
        }]
}, {
    label: 'Window',
    role: 'window',
    submenu: [{
        label: 'Minimize',
        accelerator: 'Command+M',
        role: 'minimize'
    }, {
        label: 'Close',
        accelerator: 'Command+W',
        role: 'close'
    }]
}, {
    label: 'Help',
    role: 'help',
    submenu: [{
        label: 'About ' + app_name,
        click: function() {
            require('electron').shell.openExternal("https://github.com/Meadowcottage/devRant/releases/tag/" + app_version)
        }
    }, {
        label: 'View ' + app_name,
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

if (process.platform == 'darwin') {
    module.exports = app_menu.buildFromTemplate(template_osx)
} else {
    module.exports = app_menu.buildFromTemplate(template_win)
}
