import { camelCase } from 'mostly-func';
import glob from 'glob';
import path from 'path';

// load all models
let modelFiles = glob.sync(path.join(__dirname, './*.model.js'));
export default Object.assign({}, ...modelFiles.map(file => {
  const name = camelCase(path.basename(file, '.model.js'));
  return { [name]: require(file).default };
}));
