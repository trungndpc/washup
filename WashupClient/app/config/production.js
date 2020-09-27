export default {
  __DEV__: true,
  'process.env': {
    NODE_ENV: JSON.stringify('production'),
    DOMAIN: JSON.stringify('http://wash-up.vn')
  }
}
