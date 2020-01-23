module.exports = function override(config, env) {
	if (env.IS_ELECTRON) {
		config.target = 'electron-renderer';
	}

	return config;
}