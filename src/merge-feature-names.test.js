import { describe } from 'riteway';
import deepFreeze from 'deep-freeze';

import { mergeFeatureNames } from './merge-feature-names';

describe('mergeFeatureNames()', async should => {
  const { assert } = should();

  assert({
    given: 'one array',
    should: 'return an new empty array',
    actual: mergeFeatureNames(deepFreeze([])),
    expected: []
  });

  assert({
    given: 'two or more empty arrays',
    should: 'return an new empty array',
    actual: mergeFeatureNames(deepFreeze([]), deepFreeze([]), deepFreeze([])),
    expected: []
  });

  assert({
    given: 'two or more arrays of strings with duplicate values',
    should: 'return a new array with all the unique values',
    actual: mergeFeatureNames(
      deepFreeze(['foo', 'bar', 'baz']),
      deepFreeze(['bar', 'cat', 'bat']),
      deepFreeze(['baz', 'rat', 'dog'])
    ),
    expected: ['foo', 'bar', 'baz', 'cat', 'bat', 'rat', 'dog']
  });
});
