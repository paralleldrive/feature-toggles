import { describe } from 'riteway';
import { isActiveFeatureName } from './is-active-feature-name';

describe('isActiveFeatureName()', async should => {
  const { assert } = should();

  assert({
    given: 'no arguments',
    should: 'return false',
    actual: isActiveFeatureName()(),
    expected: false
  });

  assert({
    given: 'an empty array and id string',
    should: 'return false',
    actual: isActiveFeatureName('posts')([]),
    expected: false
  });

  assert({
    given: 'an array of feature names and existing feature id string',
    should: 'return true',
    actual: isActiveFeatureName('bar')(['foo', 'bar', 'baz']),
    expected: true
  });

  assert({
    given: 'an array of feature names and non existant feature id string',
    should: 'return false',
    actual: isActiveFeatureName('non-existant-feature-id')([
      'foo',
      'bar',
      'baz'
    ]),
    expected: false
  });
});
