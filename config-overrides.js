// https://medium.com/@tommedema/hot-module-reloading-with-create-react-app-v3-f2c7afe1dae8
const rewireReactHotLoader = require('react-app-rewire-hot-loader')

// config-overrides.js
module.exports = function override(config, env) {
  config = rewireReactHotLoader(config, env)

  // see https://github.com/gaearon/react-hot-loader#react--dom
  config.resolve.alias = {
    ...config.resolve.alias,
    'react-dom': '@hot-loader/react-dom'
  }

  return config
}