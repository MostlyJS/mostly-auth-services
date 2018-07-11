const auth = require('feathers-authentication');
const jwt = require('feathers-authentication-jwt');
const local = require('feathers-authentication-local');

const defaultHooks = require('./authentication.hooks');
const jwtVerifier = require('./jwt-verifier');
const localVerifier = require('./local-verifier');

module.exports = function (options) {
  return function (app) {
    app.set('auth', options);
    app.configure(auth(options));
    app.configure(jwt({ Verifier: jwtVerifier }));
    app.configure(local({ Verifier: localVerifier }));

    app.service('authentication').hooks(defaultHooks(options));
  };
};