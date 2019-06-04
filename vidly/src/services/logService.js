import * as Sentry from '@sentry/browser';
import { sentryEndpoint, version, environment } from '../config.json';

function init() {
  Sentry.init({
    dsn: sentryEndpoint,
    release: version,
    environment: environment,
  });
}

function log(error) {
  Sentry.captureException(error);
}

export default {
  init,
  log
}