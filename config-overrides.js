const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': 'rgba(39, 105, 235, 1)',
      '@info-color': 'rgba(98, 251, 252, 1)',
      '@highlight-color': '#ff8e53',
      '@normal-color': 'rgba(40, 173, 246, 1)',
      '@white': '#fff',
      '@black': 'rgba(58, 62, 67, 1)',
      '@warning-color': 'rgba(98, 251, 252, 1)',
      '@error-color': 'rgba(98, 251, 252, 1)'
    },
  }),
);