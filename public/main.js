
const { app, BrowserWindow } = require('electron')
// const path = require('path')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
// let mainWindow

// Keep a reference for dev mode
let dev = false

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        title: "VirtualOffice",
        width: 1280,
        height: 720,
        icon: __dirname + './vo_logo.ico'
    })
    mainWindow.removeMenu()

    // load HTML file via url
    mainWindow.loadURL('https://jsin-37.github.io/')
    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
        if (dev) {
            const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer')

            installExtension(REACT_DEVELOPER_TOOLS)
                .catch(err => console.log('Error loading React DevTools: ', err))
            mainWindow.webContents.openDevTools()
        }
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
    const { nativeTheme } = require('electron')
    nativeTheme.themeSource = 'light';
    createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.

    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

// Stop error
app.allowRendererProcessReuse = true