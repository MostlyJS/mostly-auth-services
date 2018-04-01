require = require("esm")(module/*, options*/);
console.time('mostly-auth-services import');
module.exports = require('./src/index').default;
module.exports.entities = require('./src/entities').default;
module.exports.models = require('./src/models').default;
console.timeEnd('mostly-auth-services import');
