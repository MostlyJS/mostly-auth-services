const auth = require('feathers-authentication');
const { hooks } = require('mostly-feathers-mongoose');

module.exports = function (options = {}) {
  return {
    before: {
      create: [
        auth.hooks.authenticate('jwt', 'local')
      ],
      remove: [
        auth.hooks.authenticate('jwt')
      ]
    },
    after: {
      all: [ hooks.responder() ]
    }
  };
};