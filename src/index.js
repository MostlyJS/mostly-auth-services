import { camelCase } from 'mostly-func';
import glob from 'glob';
import path from 'path';

// load all services
const serviceFiles = glob.sync(path.join(__dirname, './services/*/*.service.js'));
export default Object.assign({}, ...serviceFiles.map(file => {
  const name = camelCase(path.basename(path.dirname(file)));
  return { [name]: require(file).default };
}));
