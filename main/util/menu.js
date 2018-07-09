const { app, Menu } = require('electron')

function buildNativeTopBarMenu(template) {
	const template = [{
			label: 'Edit',
			submenu: [{
					type: 'separator'
				},
				{
					role: 'cut'
				},
				{
					role: 'copy'
				},
				{
					role: 'paste'
				}
			]
		},
		{
			label: 'View',
			submenu: [{
					role: 'toggledevtools'
				},
				{
					role: 'togglefullscreen'
				}
			]
		},
		{
			role: 'window',
			submenu: [{
					role: 'minimize'
				},
				{
					role: 'close'
				}
			]
		}
	]

	if (process.platform === 'darwin') {
		template.unshift({
			label: app.getName(),
			submenu: [{
					role: 'about'
				},
				{
					type: 'separator'
				},
				{
					role: 'services',
					submenu: []
				},
				{
					type: 'separator'
				},
				{
					role: 'hide'
				},
				{
					role: 'hideothers'
				},
				{
					role: 'unhide'
				},
				{
					type: 'separator'
				},
				{
					role: 'quit'
				}
			]
		})
	}

	const menu = Menu.buildFromTemplate(template)
	Menu.setApplicationMenu(menu)
}

module.exports = buildNativeTopBarMenu
