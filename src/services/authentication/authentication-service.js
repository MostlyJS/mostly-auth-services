import auth from 'feathers-authentication';
import jwt from 'feathers-authentication-jwt';
import local from 'feathers-authentication-local';
import defaultHooks from './authentication-hooks';
import verifier from './verifier';

export default function(options) {
  return function(app) {
    app.set('auth', options);
    app.configure(auth(options));
    app.configure(jwt());
    app.configure(local({ Verifier: verifier }));

    app.service('authentication').hooks(defaultHooks(options));
  }
};