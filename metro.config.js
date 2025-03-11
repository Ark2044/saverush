const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);

// 1) Add the SVG transformer
defaultConfig.transformer.babelTransformerPath = require.resolve(
  'react-native-svg-transformer',
);

// 2) Tell Metro that `.svg` files are not regular assets, but source files
defaultConfig.resolver.assetExts = defaultConfig.resolver.assetExts.filter(
  ext => ext !== 'svg',
);
defaultConfig.resolver.sourceExts.push('svg');

// 3) Custom config (inline requires, maxWorkers, etc.)
const customConfig = {
  maxWorkers: 1, // Reduce workers for lower CPU usage
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true, // Inline requires for faster startup
      },
    }),
  },
};

// 4) Merge everything
module.exports = mergeConfig(defaultConfig, customConfig);
