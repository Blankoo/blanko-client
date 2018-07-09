// Native
const { format } = require('url')
const path = require('path')
// Packages
const { BrowserWindow, app, Menu } = require('electron')
const isDev = require('electron-is-dev')
const prepareNext = require('electron-next')
const { resolve } = require('app-root-path')
const windowStateKeeper = require('electron-window-state')
const buildNativeTopBarMenu = require('./util/menu')

app.setName('Blanko')

// Prepare the renderer once the app is ready
app.on('ready', async e => {
  await prepareNext('./renderer')

	// Save the window state
	const windowState = windowStateKeeper({
    defaultWidth: 1280,
    defaultHeight: 800,
  });

  const mainWindow = new BrowserWindow({
    width: windowState.width,
    height: windowState.height,
		x: windowState.x,
    y: windowState.y,
		minWidth: 524,
		minHeight: 600,
    title: 'Blanko',
    titleBarStyle: 'hidden-inset',
		center: true,
		webPreferences: {
    	webSecurity: true,
			backgroundThrottling: false,
			devtools: true
  	},
    icon: path.join(__dirname, 'assets/icon.icns')
  })

	windowState.manage(mainWindow);


  const devPath = 'http://localhost:8000/start'

  const prodPath = format({
    pathname: resolve('renderer/out/start/index.html'),
    protocol: 'file:',
    slashes: true
  })

  const url = isDev ? devPath : prodPath
  mainWindow.loadURL(url)

	const windows = {
    'main': mainWindow
  }

  global.windows = windows

	buildNativeTopBarMenu()
})

app.on('window-all-closed', app.quit)
