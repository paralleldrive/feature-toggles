import pipe from 'ramda/src/pipe';

import { getActiveFeatureNames } from './get-active-feature-names';
import { getReqQueryFeatureNames } from './get-req-query-feature-names';
import { getBrowserQueryFeatureNames } from './get-browser-query-feature-names';
import { activateFeatures } from './activate-features';

const activateReqFeatureNames = pipe(
  getReqQueryFeatureNames,
  activateFeatures
);
const activateSearchFeatureNames = pipe(
  getBrowserQueryFeatureNames,
  activateFeatures
);

const flow = (req, search) =>
  pipe(
    activateReqFeatureNames(req),
    activateSearchFeatureNames(search),
    getActiveFeatureNames
  );

export const getCurrentActiveFeatureNames = ({
  initialFeatures = [],
  req,
  search
} = {}) =>
  flow(
    req,
    search
  )(initialFeatures);
