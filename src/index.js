import { upperFirst, camelCase } from 'lodash';
import glob from 'glob';
import path from 'path';

// load all services
let servieFiles = glob.sync(path.join(__dirname, './services/*/*.service.js'));
servieFiles.forEach(file => {
  let name = camelCase(path.basename(path.dirname(file)));
  module.exports[name] = require(file);
});
