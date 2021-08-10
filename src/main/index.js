'use strict'

import { app, BrowserWindow, ipcMain } from 'electron'
import '../renderer/store'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 900,
    useContentSize: true,
    width: 500,
    frame: false,
    transparent: true
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

ipcMain.on('createSettingWindow', function (arg) {
  createSettingWindow()
})
function createSettingWindow () {
  // Menu.setApplicationMenu(null) // 关闭子窗口菜单栏
  let settingWindow
  const modalPath = process.env.NODE_ENV === 'development'
    ? 'http://localhost:9080/#/settingWindow'
    : `file://${__dirname}/index.html#settingWindow`
  // 使用hash对子页面跳转，这是vue的路由思想
  settingWindow = new BrowserWindow({
    width: 600,
    height: 400,
    webPreferences: {
      webSecurity: false
    },
    parent: mainWindow // mainWindow是主窗口
  })

  settingWindow.loadURL(modalPath)

  settingWindow.on('closed', () => {
    settingWindow = null
  })
}
app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
