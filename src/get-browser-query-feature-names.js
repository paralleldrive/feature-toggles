import parse from 'url-parse';
import { getQueryFeatureNames } from './get-query-feature-names';

export const getBrowserQueryFeatureNames = (
  search = typeof window === 'undefined' ? '' : window.location.search
) => {
  const { query } = parse(search, true);
  return getQueryFeatureNames(query);
};
