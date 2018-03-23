import auth from 'feathers-authentication';
import { hooks } from 'mostly-feathers-mongoose';

export default function (options = {}) {
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
}