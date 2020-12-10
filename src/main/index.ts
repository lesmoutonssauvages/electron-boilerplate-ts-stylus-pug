import { app, BrowserWindow } from 'electron'
import path from 'path'

const {
  VUE_DEV_SERVER_URL = ''
  , NODE_ENV
} = process.env

const isDev = NODE_ENV === 'development'

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800
    , height: 600
    , webPreferences: {
      webSecurity: true
      , worldSafeExecuteJavaScript: true
      , contextIsolation: true
      , preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow[isDev ? 'loadURL' : 'loadFile']((isDev && VUE_DEV_SERVER_URL) ? VUE_DEV_SERVER_URL : 'build/index.html')
  // mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
