import { camelCase } from 'lodash';
import glob from 'glob';
import path from 'path';

// load all services
const serviceFiles = glob.sync(path.join(__dirname, './services/*/*.service.js'));
export default Object.assign({}, ...serviceFiles.map(file => {
  let name = camelCase(path.basename(path.dirname(file)));
  return { [name]: require(file).default };
}));
