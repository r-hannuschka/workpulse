const path = require('path');
const webpack = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  // Wichtig für VS Code Extensions, da sie im Node-Host laufen
  target: 'node', 
  mode: 'production', // Für die Entwicklung unminifiziert lassen, fürs Release 'production'
  
  // Dein Einstiegspunkt (Pfade ggf. anpassen, falls es src/timetracker.ts ist)
  entry: {
    timetracker: './src/timetracker.ts' 
  },
  
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'commonjs', // VS Code verlangt zwingend CommonJS (require)
    devtoolModuleFilenameTemplate: '../[resource-path]' // Korrigiert die Sourcemaps-Pfade beim Debuggen
  },
  
  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [
      new TsconfigPathsPlugin({ configFile: './tsconfig.json' })
    ]
  },
  
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.json'
            }
          }
        ]
      }
    ]
  },
  
  plugins: [
    // Webpack injiziert require('reflect-metadata') ganz oben in deine timetracker.js
    new webpack.BannerPlugin({
      banner: "require('reflect-metadata');",
      raw: true,
      entryOnly: true
    })
  ],
  
  // Externe Module, die VS Code selbst bereitstellt und nicht gebündelt werden dürfen
  externals: {
    vscode: 'commonjs vscode'
  },
  
  devtool: 'source-map' // Erzeugt perfekte .js.map Dateien für das VS Code Debugging
};
