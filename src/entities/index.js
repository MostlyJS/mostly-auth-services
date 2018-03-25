import glob from 'glob';
import path from 'path';

// load all entities
let entityFiles = glob.sync(path.join(__dirname, './*.entity.js'));
entityFiles.forEach(file => {
  let name = path.basename(file, '.entity.js');
  module.exports[name] = require(file);
});
