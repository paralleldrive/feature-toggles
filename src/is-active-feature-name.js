import curry from 'ramda/src/curry';

export const isActiveFeatureName = curry((featureName = '', features = []) =>
  features.includes(featureName)
);
