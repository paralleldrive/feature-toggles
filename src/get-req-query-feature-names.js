import { getQueryFeatureNames } from './get-query-feature-names';

export const getReqQueryFeatureNames = ({ query } = {}) =>
  !query ? [] : getQueryFeatureNames(query);
