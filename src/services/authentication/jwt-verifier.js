import Debug from 'debug';
import fp from 'mostly-func';

const debug = Debug('mostly:services:auth:jwt-verify');

/**
 * JWT passport verifier allowing entity query params
 */
class JWTVerifier {
  constructor (app, options = {}) {
    this.app = app;
    this.options = options;
    this.service = typeof options.service === 'string' ? app.service(options.service) : options.service;

    if (!this.service) {
      throw new Error(`options.service does not exist.\n\tMake sure you are passing a valid service path or service instance and it is initialized before feathers-authentication-jwt.`);
    }

    this.verify = this.verify.bind(this);
  }

  verify (req, payload, done) {
    debug('Received JWT payload', payload);

    const id = payload[`${this.options.entity}Id`];

    if (id === undefined) {
      debug(`JWT payload does not contain ${this.options.entity}Id`);
      return done(null, {}, payload);
    }

    debug(`Looking up ${this.options.entity} by id`, id);
    const authParams = { ...req.params.$auth };
    this.service.get(id, authParams).then(entity => {
      const newPayload = { [`${this.options.entity}Id`]: id };
      return done(null, entity, newPayload);
    })
    .catch(error => {
      debug(`Error populating ${this.options.entity} with id ${id}`, error);
      return done(null, {}, payload);
    });
  }
}

export default JWTVerifier;
