const nodeExternals = require('webpack-node-externals');
const { composePlugins, withNx } = require('@nrwl/webpack');

module.exports = composePlugins(withNx(), (config) => {
  config.entry = ['webpack/hot/poll?100', './src/main.ts'];
  config.watch = true;
  config.externals = [
    nodeExternals({
      allowlist: ['webpack/hot/poll?100'],
    }),
  ];
  config.plugins = [
    ...config.plugins,
    new webpack.HotModuleReplacementPlugin(),
  ];
  return config;
});
