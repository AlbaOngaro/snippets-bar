const { menubar } = require('menubar');
const path = require('path');
const url = require('url');

const mb = menubar({
	index: process.env.ELECTRON_START_URL || url.format({
		pathname: path.join(__dirname, '/../build/index.html'),
		protocol: 'file:',
		slashes: true
	})
});

mb.on('ready', () => {
	console.log('app is ready');
});