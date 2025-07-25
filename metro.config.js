const { getDefaultConfig} = require('@expo/metro-config');


const defaultConfig = getDefaultConfig(_dirname);


defaultConfig.resolver.sourceExts.push('cjs');


module.exports = defaultConfig