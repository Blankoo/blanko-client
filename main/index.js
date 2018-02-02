// Native
const { format } = require('url')

// Packages
const { BrowserWindow, app } = require('electron')
const isDev = require('electron-is-dev')
const prepareNext = require('electron-next')
const { resolve } = require('app-root-path')
const windowStateKeeper = require("electron-window-state")

app.setName('blanko')

// Prepare the renderer once the app is ready
app.on("ready", async () => {
  await prepareNext("./renderer")

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
		minWidth: 800,
		minHeight: 600,
    title: "Tide",
    titleBarStyle: "hidden-inset",
		center: true,
		webPreferences: {
    	webSecurity: false,
			backgroundThrottling: false,
			devtools: true
  	}
  })

	windowState.manage(mainWindow);

  const devPath = "http://localhost:8000/start"

  const prodPath = format({
    pathname: resolve("renderer/out/start/index.html"),
    protocol: "file:",
    slashes: true
  })

  const url = isDev ? devPath : prodPath
  mainWindow.loadURL(url)

	const windows = {
    "main": mainWindow
  }

	// Make the window instances accessible from everywhere
  global.windows = windows

	// Add the native menu
	buildMenu()
})

// Quit the app once all windows are closed
app.on('window-all-closed', app.quit)
