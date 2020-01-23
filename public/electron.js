const { menubar } = require('menubar');
const path = require('path');
const url = require('url');
const { nativeTheme } = require('electron');

const mb = menubar({
	index: process.env.ELECTRON_START_URL || url.format({
		pathname: path.join(__dirname, '/../build/index.html'),
		protocol: 'file:',
		slashes: true
	}),
	icon: nativeTheme.shouldUseDarkColors ? 'public/icon-light.png' : 'public/icon-dark.png',
	browserWindow: {
		webPreferences: {
			nodeIntegration: true
		}
	}
});

mb.on('ready', () => {
	console.log('app is ready');
});