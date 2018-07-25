import lensPath from 'ramda/src/lensPath';
import set from 'ramda/src/set';
import view from 'ramda/src/view';
import map from 'ramda/src/map';

const nameLens = lensPath(['name']);
const isActiveLens = lensPath(['isActive']);

const getName = view(nameLens);
const setIsActive = set(isActiveLens);

export const activateFeatures = featureNamesToEnable =>
  map(
    feature =>
      featureNamesToEnable.includes(getName(feature))
        ? setIsActive(true, feature)
        : feature
  );
