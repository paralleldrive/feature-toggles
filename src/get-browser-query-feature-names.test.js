import { describe } from 'riteway';

import { getBrowserQueryFeatureNames } from './get-browser-query-feature-names';

describe('getBrowserQueryFeatureNames()', async should => {
  const { assert } = should();
  {
    assert({
      given: 'no arguments in node',
      should: 'return empy array',
      actual: getBrowserQueryFeatureNames(),
      expected: []
    });
  }
  {
    const url = '?ft=';
    assert({
      given: 'search string with no features',
      should: 'return empy array',
      actual: getBrowserQueryFeatureNames(url),
      expected: []
    });
  }
  {
    const url = '?ft=foo,bar';
    assert({
      given: 'search string with features',
      should: 'return the correct features',
      actual: getBrowserQueryFeatureNames(url),
      expected: ['foo', 'bar']
    });
  }
});
