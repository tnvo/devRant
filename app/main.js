const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const electronInstaller = require('electron-winstaller');

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

resultPromise = electronInstaller.createWindowsInstaller({
    appDirectory: '../build/devrant.io-win32-x64',
    outputDirectory: '../package',
    authors: 'devRant.io',
    exe: 'devRant.io.exe'

    appDirectory: '../build/devrant.io-win32-x64',
    authors: 'devRant.io Team | [MEADOW_DEV]',
    exe: 'devRant.io.exe',
    iconUrl: '../icon/favicon.ico',
    loadingGif: path.join(config.STATIC_PATH, 'loading.gif'),
    name: config.APP_NAME,
    noMsi: true,
    outputDirectory: DIST_PATH,
    productName: config.APP_NAME,
    remoteReleases: config.GITHUB_URL,
    setupExe: config.APP_NAME + 'Setup-v' + config.APP_VERSION + '.exe',
    setupIcon: config.APP_ICON + '.ico',
    signWithParams: signWithParams,
    title: config.APP_NAME,
    usePackageJson: false,
    version: pkg.version
  });

resultPromise.then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`));
