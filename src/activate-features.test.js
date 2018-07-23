import { describe } from 'riteway';
import deepFreeze from 'deep-freeze';

import { activateFeatures } from './activate-features';

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

describe('activateFeatures()', async should => {
  const { assert } = should();

  assert({
    given: 'an existing and non existing feature names',
    should: 'return the correct features',
    actual: activateFeatures(['baz', 'other', 'fizzle'])(makeFeatures()),
    expected: [
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
        isActive: true
      },
      {
        name: 'other',
        isActive: true
      }
    ]
  });
});
