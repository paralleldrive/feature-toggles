import { getActiveFeatures } from './get-active-features';
import { getReqQueryFeatures } from './get-req-query-features';
import { getBrowserQueryFeatures } from './get-browser-query-features';
import { activateFeatures } from './activate-features';
import pipe from 'ramda/src/pipe';

const flow = (req, search) =>
  pipe(
    activateFeatures(getReqQueryFeatures(req)),
    activateFeatures(getBrowserQueryFeatures(search)),
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
