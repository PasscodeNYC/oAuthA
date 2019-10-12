
const { resolve } = require;
const ENV = (process.env.BABEL_ENV || process.env.NODE_ENV);
const isProd = ENV === 'production';
const isTest = ENV === 'test';

// default supported browser.
const defaultBrowserList = ['> 0.25%', 'IE >= 9'];

module.exports = function () {

  return {
    presets: [
      [
        resolve('@babel/preset-typescript'),
        resolve('@babel/preset-env'),
        {
          loose: true,
          modules: isTest ? 'commonjs' : false,
          targets: {
            browsers: defaultBrowserList,
          },
          exclude: ['transform-regenerator', 'transform-async-to-generator'],
        },
      ],
    ],
    plugins: [
      resolve('@babel/plugin-syntax-dynamic-import'),
      resolve('@babel/plugin-transform-object-assign'),
      [resolve('@babel/plugin-proposal-decorators'), { legacy: true }],
      [resolve('@babel/plugin-proposal-class-properties'), { loose: true }],
      resolve('@babel/plugin-proposal-object-rest-spread'),
      isProd &&
      resolve('babel-plugin-transform-react-remove-prop-types'),
      resolve('@babel/plugin-transform-react-jsx'),
      [resolve('fast-async'), { spec: true }],
      resolve('babel-plugin-macros'),
      resolve('react-hot-loader/babel'),
    ].filter(Boolean),
  };
}