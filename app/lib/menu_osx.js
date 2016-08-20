// Electron
const electron = require('electron');
const app = electron.app;
const app_name = app.getName();
const app_version = app.getVersion();
const app_menu = electron.Menu;

var template = [{
    label: 'Application',
    submenu: [{
        label: 'Hide devRant',
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

module.exports = app_menu.buildFromTemplate(template)
