'use strict'

import { app, BrowserWindow, ipcMain, ipcRenderer, globalShortcut } from 'electron'
import '../renderer/store'
require('electron-referer')('http://www.bilibili.com/')
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow, chatWindow, dmWindow, settingWindow, aboutWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 650,
    useContentSize: false,
    width: 500,
    frame: true,
    webPreferences: {webSecurity: false},
    transparent: true
  })
  mainWindow.setMenuBarVisibility(false)
  mainWindow.loadURL(winURL)
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}
const dmPath = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9080/#/dmWindow'
  : `file://${__dirname}/index.html#dmWindow`
function createDmWindow () {
  /**
   * Initial window options
   */
  dmWindow = new BrowserWindow({
    height: 600,
    useContentSize: false,
    width: 455,
    frame: false,
    transparent: true
  })

  dmWindow.loadURL(dmPath)

  dmWindow.on('closed', () => {
    dmWindow = null
  })
}
ipcMain.on('debug', function (arg) {
  if (dmWindow != null) {
    dmWindow.webContents.openDevTools()
  }
})
function createChatWindow () {
  /**
   * Initial window options
   */
  chatWindow = new BrowserWindow({
    height: 30,
    useContentSize: true,
    width: 260,
    frame: true,
    transparent: false
  })
  const chatPath = process.env.NODE_ENV === 'development'
    ? 'http://localhost:9080/#/chatWindow'
    : `file://${__dirname}/index.html#chatWindow`
  chatWindow.setMenuBarVisibility(false)
  chatWindow.loadURL(chatPath)

  chatWindow.on('closed', () => {
    chatWindow = null
  })
}
ipcMain.on('createWindow', function (arg) {
  if (mainWindow == null) {
    createWindow()
  }
})
ipcMain.on('createChatWindow', function (arg) {
  if (chatWindow == null) {
    createChatWindow()
  }
})
ipcMain.on('createSettingWindow', function (arg) {
  if (settingWindow == null) {
    createSettingWindow()
  }
})
ipcMain.on('createDmWindow', function (arg) {
  if (dmWindow == null) {
    createDmWindow()
  }
})
ipcMain.on('createAboutWindow', function (arg) {
  if (aboutWindow == null) {
    createAboutWindow()
  }
})
function createAboutWindow () {
  // Menu.setApplicationMenu(null) // 关闭子窗口菜单栏
  const aboutPath = process.env.NODE_ENV === 'development'
    ? 'http://localhost:9080/#/aboutWindow'
    : `file://${__dirname}/index.html#aboutWindow`
  // 使用hash对子页面跳转，这是vue的路由思想
  aboutWindow = new BrowserWindow({
    height: 250,
    useContentSize: true,
    width: 455,
    frame: true,
    transparent: false,
    parent: mainWindow // mainWindow是主窗口
  })
  aboutWindow.setMenuBarVisibility(false)
  aboutWindow.loadURL(aboutPath)

  aboutWindow.on('closed', () => {
    aboutWindow = null
  })
}
function createSettingWindow () {
  // Menu.setApplicationMenu(null) // 关闭子窗口菜单栏
  const modalPath = process.env.NODE_ENV === 'development'
    ? 'http://localhost:9080/#/settingWindow'
    : `file://${__dirname}/index.html#settingWindow`
  // 使用hash对子页面跳转，这是vue的路由思想
  settingWindow = new BrowserWindow({
    height: 450,
    useContentSize: true,
    width: 450,
    frame: true,
    transparent: false,
    parent: mainWindow // mainWindow是主窗口
  })
  settingWindow.setMenuBarVisibility(false)
  settingWindow.loadURL(modalPath)

  settingWindow.on('closed', () => {
    mainWindow.webContents.send('did-close-fresh', 'refresh')
    if (chatWindow !== null) {
      chatWindow.webContents.send('setchat-close-fresh', 'refresh')
    }
    settingWindow = null
  })
}
app.on('ready', () => {
  createWindow()
  globalShortcut.register('CommandOrControl+M', () => {
    console.log('CommandOrControl+M is pressed')
    if (mainWindow != null) {
      mainWindow.webContents.openDevTools()
    }
    if (dmWindow != null) {
      dmWindow.webContents.openDevTools()
    }
  })
})

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
