import glob from 'glob';
import path from 'path';

// load all models
let modelFiles = glob.sync(path.join(__dirname, './*-model.js'));
modelFiles.forEach(file => {
  let name = path.basename(file, '-model.js');
  module.exports[name] = require(file);
});
