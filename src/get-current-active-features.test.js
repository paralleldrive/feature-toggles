import { describe } from 'riteway';
import deepFreeze from 'deep-freeze';

import { getCurrentActiveFeatures } from './get-current-active-features';

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
      name: 'other',
      isActive: false
    }
  ]);

describe('getCurrentActiveFeatures()', async should => {
  const { assert } = should();

  assert({
    given: 'no arguments',
    should: 'return an empty array',
    actual: getCurrentActiveFeatures(),
    expected: []
  });

  assert({
    given: 'an empty object',
    should: 'return an empty array',
    actual: getCurrentActiveFeatures({}),
    expected: []
  });

  assert({
    given: 'an empty initial features',
    should: 'return an empty array',
    actual: getCurrentActiveFeatures({ initialFeatures: [] }),
    expected: []
  });

  assert({
    given: 'initial features',
    should: 'return the correct features',
    actual: getCurrentActiveFeatures({ initialFeatures: makeFeatures() }),
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
      actual: getCurrentActiveFeatures({
        initialFeatures: makeFeatures(),
        req
      }),
      expected: ['foo', 'bar', 'baz', 'other']
    });
  }

  {
    const search = '?ft=baz,other';

    assert({
      given: 'initial features and search',
      should: 'return the correct features',
      actual: getCurrentActiveFeatures({
        initialFeatures: makeFeatures(),
        search
      }),
      expected: ['foo', 'bar', 'baz', 'other']
    });
  }
});
