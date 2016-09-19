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
const app_config = require('./config');
const app_is_dev = require('electron-is-dev');

// System paths
const path = require('path');
const fs = require('fs');

// Electron DL
require('electron-dl')();

// Right Click/Context menu contents
require('electron-context-menu')();

// Main App Window
let mainWindow

// If the application is quitting
let isQuitting = false;

// Main Window
function createMainWindow() {
    const lastWindowState = app_config.get('lastWindowState');
    const app_view = new electron.BrowserWindow({
        title: app_title,
        titleBarStyle: 'hidden-inset',
        backgroundColor: '#40415a',
        x: lastWindowState.x,
        y: lastWindowState.y,
        width: lastWindowState.width,
        height: lastWindowState.height,
        movable: true,
        width: 450,
        height: 912,
        minWidth: 450,
        minHeight: 500,
        maxWidth: 640,
        fullscreenable: false,
        resizable: true,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: false,
            plugins: true
        }
    });
    app_view.loadURL('https://devrant.io/feed');

    // When window is closed, hide window
    app_view.on('close', e => {
        if (!isQuitting) {
            e.preventDefault();
            if (process.platform === 'darwin') {
                app.hide();
            } else {
                app.quit();
            }
        }

    });
    return app_view;
}

app.on('ready', () => {
    mainWindow = createMainWindow();
    menu.setApplicationMenu(require('./menu'))
    if (app_is_dev) {
        mainWindow.openDevTools()
    }

    const app_page = mainWindow.webContents;

    app_page.on('dom-ready', () => {

        // Stock style additions
        app_page.insertCSS(fs.readFileSync(path.join(__dirname, 'app.css'), 'utf8'));

        // Dark theme
        //app_page.insertCSS(fs.readFileSync(path.join(__dirname, 'app-dark.css'), 'utf8'));

        // MacOS Button Offset & Navbar Padding
        if (process.platform == 'darwin') {
            app_page.insertCSS('.rant-top-bar { padding-top: 24px!important; -webkit-app-region: drag!important; } .rantlist-bg { margin-top: 24px!important; } .profile-details { margin-top: 74px!important; } .profile-tabs { margin-bottom: -24px!important; }');
        }

        //Extenal Links Open in New Window
        app_page.executeJavaScript("$('a').not('[href*=\"mailto:\"]').each(function (){var isInternalLink = new RegExp('/' + window.location.host + '/');if ( ! isInternalLink.test(this.href) ) {$(this).attr('target', '_blank');}});");

        // Adds Download Button to Menu
        app_page.executeJavaScript("$('<li><a target=\"_blank\" href=\"https://www.devrant.io/\"><span class=\"icon-about2 icon\"></span>Downloads</a></li>').insertAfter('div.menu-modal > ul > li:nth-child(5)')");

        // Adds Feedback Button to Menu
        app_page.executeJavaScript("$('<li><a target=\"_blank\" href=\"mailto:info@devrant.io\"><span class=\"icon-feedback2 icon\"></span>Feedback</a></li>').insertAfter('div.menu-modal > ul > li:nth-child(5)')");

        //Adds Back Button
        app_page.executeJavaScript("$('.feed-top-icons:nth-child(2), .rant-top-bar > .share-icons, div.body-col2.profile-page > .rant-top-bar').prepend('<a href=\"javascript: history.back();\" title=\"Back\" alt=\"Back\"><span class=\"icon-back2 icon\"></span></a>')");

        mainWindow.show();

        //Open external links in browser
        app_page.on('new-window', (e, url) => {
            e.preventDefault();
            electron.shell.openExternal(url);
        })

        //Shortcut to reload the page.
        globalShortcut.register('CmdOrCtrl+R', () => {
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
})
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
app.on('activate', () => {
    mainWindow.show()
})
app.on('before-quit', () => {
    isQuitting = true;
});
