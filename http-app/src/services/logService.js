import * as Sentry from '@sentry/browser';
import config from '../config.json';

function init() {
  Sentry.init({
    dsn: config.sentryEndpoint,
    release: config.version,
    environment: config.environment,
  });
}

function log(error) {
  Sentry.captureException(error);
}

export default {
  init,
  log
}