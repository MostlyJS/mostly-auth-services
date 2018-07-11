const { camelCase } = require('mostly-func');
const glob = require('glob');
const path = require('path');

// load all services
const serviceFiles = glob.sync(path.join(__dirname, './services/*/*.service.js'));
module.exports = Object.assign({}, ...serviceFiles.map(file => {
  const name = camelCase(path.basename(path.dirname(file)));
  return { [name]: require(file) };
}));
