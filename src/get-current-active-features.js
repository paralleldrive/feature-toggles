import pipe from 'ramda/src/pipe';

import { getActiveFeatures } from './get-active-features';
import { getReqQueryFeatures } from './get-req-query-features';
import { getBrowserQueryFeatures } from './get-browser-query-features';
import { activateFeatures } from './activate-features';

const activateReqFeatureNames = pipe(
  getReqQueryFeatures,
  activateFeatures
);
const activateSearchFeatureNames = pipe(
  getBrowserQueryFeatures,
  activateFeatures
);

const flow = (req, search) =>
  pipe(
    activateReqFeatureNames(req),
    activateSearchFeatureNames(search),
    getActiveFeatures
  );

export const getCurrentActiveFeatures = ({
  initialFeatures = [],
  req,
  search
} = {}) =>
  flow(
    req,
    search
  )(initialFeatures);
