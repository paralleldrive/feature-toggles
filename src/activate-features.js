import lensPath from 'ramda/src/lensPath';
import set from 'ramda/src/set';
import view from 'ramda/src/view';
import curryN from 'ramda/src/curryN';

const nameLens = lensPath(['name']);
const isActiveLens = lensPath(['isActive']);

const getName = view(nameLens);
const setIsActive = set(isActiveLens);

const curryTwo = curryN(2);

export const activateFeatures = curryTwo(
  (featureNamesToEnable = [], features = []) =>
    features.map(
      feature =>
        featureNamesToEnable.includes(getName(feature))
          ? setIsActive(true, feature)
          : feature
    )
);
