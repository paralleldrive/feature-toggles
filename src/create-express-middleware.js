import curry from 'ramda/src/curry';
import { parse } from 'url';

import { isActiveFeatureName } from './is-active-feature-name';
import { mergeFeatureNames } from './merge-feature-names';
import { getQueryFeatures } from './get-query-features';

const setStatus = (res, isActiveFeatureName) =>
  isActiveFeatureName ? res.status(200) : res.status(404);

// ({ features: [...String] }, requiredFeature: String, methods?: Object) => (req, res, next) => void
export const createExpressMiddleware = curry(
  ({ features }, requiredFeature, methods) => (req, res, next) => {
    const parsedUrl = parse(req.url, true);
    const { query } = parsedUrl;
    const updatedFeatures = mergeFeatureNames(
      features,
      getQueryFeatures(query)
    );
    setStatus(res, isActiveFeatureName(requiredFeature, updatedFeatures));

    const handler = methods[req.method.toLowerCase()];
    if (handler !== undefined && typeof handler === 'function') {
      return handler(req, res);
    }

    next();
  }
);
