const commonPaths = require('./common-paths');

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { WebpackPluginServe: Serve } = require('webpack-plugin-serve');

const port = process.env.PORT || 3000;

const config = {
  mode: 'development',
  entry: {
    app: [`${commonPaths.appEntry}/index.js`, 'webpack-plugin-serve/client'],
  },
  output: {
    filename: '[name].[fullhash].js',
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [require('react-refresh/babel')].filter(Boolean),
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              esModule: true,
              modules: {
                namedExport: true,
              },
            },
          },
          {
            loader: 'css-loader',
            options: {
              esModule: true,
              modules: {
                compileType: 'module',
                mode: 'local',
                exportLocalsConvention: 'camelCaseOnly',
                namedExport: true,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      DEPLOYED_ADDRESS: JSON.stringify(fs.readFileSync('../deployedAddress', 'utf8').replace(/\n|\r/g, "")),
      DEPLOYED_ABI: fs.existsSync('deployedABI') && fs.readFileSync('../deployedABI', 'utf8'),
    }),
    new ReactRefreshWebpackPlugin({
      overlay: { sockIntegration: 'wps' },
    }),
    new Serve({
      historyFallback: true,
      liveReload: false,
      hmr: true,
      host: 'localhost',
      port: port,
      open: true,
      static: commonPaths.outputPath,
    }),
  ],
  watch: true,
};

module.exports = config;
