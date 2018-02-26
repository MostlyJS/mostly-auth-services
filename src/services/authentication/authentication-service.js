import auth from 'feathers-authentication';
import jwt from 'feathers-authentication-jwt';
import local from 'feathers-authentication-local';
import defaultHooks from './authentication-hooks';
import jwtVerifier from './jwt-verifier';
import localVerifier from './local-verifier';

export default function(options) {
  return function(app) {
    app.set('auth', options);
    app.configure(auth(options));
    app.configure(jwt({ Verifier: jwtVerifier }));
    app.configure(local({ Verifier: localVerifier }));

    app.service('authentication').hooks(defaultHooks(options));
  };
}