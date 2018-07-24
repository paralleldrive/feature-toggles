import { describe } from 'riteway';
import deepFreeze from 'deep-freeze';

import { getQueryFeatureNames } from './get-query-feature-names';

describe('getQueryFeatureNames()', async should => {
  const { assert } = should();

  assert({
    given: 'no arguments',
    should: 'return an empty array',
    actual: getQueryFeatureNames(),
    expected: []
  });

  {
    const query = deepFreeze({});
    assert({
      given: 'empty object',
      should: 'return an empty array',
      actual: getQueryFeatureNames(query),
      expected: []
    });
  }

  {
    const query = deepFreeze({ foo: 'foo,bar,help' });
    assert({
      given: 'query object with no ft key',
      should: 'return an empty array',
      actual: getQueryFeatureNames(query),
      expected: []
    });
  }

  {
    const query = deepFreeze({ foo: 'something', ft: 'foo,bar,help' });
    assert({
      given: 'query object with key of ft and a value of a string of features',
      should: 'return an array of the features',
      actual: getQueryFeatureNames(query),
      expected: ['foo', 'bar', 'help']
    });
  }
});
