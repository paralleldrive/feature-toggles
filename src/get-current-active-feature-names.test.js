import { describe } from 'riteway';
import deepFreeze from 'deep-freeze';

import { getCurrentActiveFeatureNames } from './get-current-active-feature-names';

const makeFeatures = () =>
  deepFreeze([
    {
      name: 'foo',
      isActive: true
    },
    {
      name: 'bar',
      isActive: true
    },
    {
      name: 'baz',
      isActive: false
    },
    {
      name: 'baz-dependent',
      isActive: false,
      dependencies: ['baz']
    },
    {
      name: 'other',
      isActive: false
    }
  ]);

describe('getCurrentActiveFeatureNames()', async should => {
  const { assert } = should();

  assert({
    given: 'no arguments',
    should: 'return an empty array',
    actual: getCurrentActiveFeatureNames(),
    expected: []
  });

  assert({
    given: 'an empty object',
    should: 'return an empty array',
    actual: getCurrentActiveFeatureNames({}),
    expected: []
  });

  assert({
    given: 'an empty initial features',
    should: 'return an empty array',
    actual: getCurrentActiveFeatureNames({ initialFeatures: [] }),
    expected: []
  });

  assert({
    given: 'initial features',
    should: 'return the correct features',
    actual: getCurrentActiveFeatureNames({ initialFeatures: makeFeatures() }),
    expected: ['foo', 'bar']
  });

  {
    const req = deepFreeze({
      query: {
        ft: 'baz,other'
      }
    });

    assert({
      given: 'initial features and req',
      should: 'return the correct features',
      actual: getCurrentActiveFeatureNames({
        initialFeatures: makeFeatures(),
        req
      }),
      expected: ['foo', 'bar', 'baz', 'other']
    });
  }
  {
    const req = deepFreeze({
      query: {
        ft: 'baz-dependent'
      }
    });

    assert({
      given: 'initial features and req',
      should: 'respect dependencies and enable the correct features',
      actual: getCurrentActiveFeatureNames({
        initialFeatures: makeFeatures(),
        req
      }),
      expected: ['foo', 'bar']
    });
  }

  {
    const search = '?ft=baz,other';

    assert({
      given: 'initial features and search',
      should: 'return the correct features',
      actual: getCurrentActiveFeatureNames({
        initialFeatures: makeFeatures(),
        search
      }),
      expected: ['foo', 'bar', 'baz', 'other']
    });
  }

  {
    const search = '?ft=baz-dependent';

    assert({
      given: 'initial features and search',
      should: 'respect dependencies and enable the correct features',
      actual: getCurrentActiveFeatureNames({
        initialFeatures: makeFeatures(),
        search
      }),
      expected: ['foo', 'bar']
    });
  }
});
