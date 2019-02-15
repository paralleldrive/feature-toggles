import curry from 'ramda/src/curry';
import { parse } from 'url';

import { isActiveFeatureName } from './is-active-feature-name';
import { mergeFeatureNames } from './merge-feature-names';
import { getQueryFeatureNames } from './get-query-feature-names';

// ({ features: [...String] }, requiredFeature: String, methods?: Object) => (req, res, next) => void
export const createExpressMiddleware = curry(
  ({ features }, requiredFeature, methods) => (req, res, next) => {
    const parsedUrl = parse(req.url, true);
    const { query } = parsedUrl;
    const updatedFeatures = mergeFeatureNames(
      features,
      getQueryFeatureNames(query)
    );

    if (!isActiveFeatureName(requiredFeature, updatedFeatures))
      res.status(404).send();

    const handler = methods[req.method.toLowerCase()];
    if (handler !== undefined && typeof handler === 'function') {
      return handler(req, res);
    }

    next();
  }
);
