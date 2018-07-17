import { describe } from 'riteway';
import deepFreeze from 'deep-freeze';

import { getIsEnabled } from './get-is-enabled';

describe('getIsEnabled()', async should => {
  const { assert } = should('return false');

  assert({
    given: 'no arguments',
    actual: getIsEnabled(),
    expected: false
  });
});

describe('getIsEnabled([])', async should => {
  const { assert } = should('return false');

  assert({
    given: 'an empty array',
    actual: getIsEnabled([]),
    expected: false
  });
});

describe('getIsEnabled([], String)', async should => {
  const { assert } = should('return false');

  assert({
    given: 'an empty array and a feature name',
    actual: getIsEnabled([], 'posts'),
    expected: false
  });
});

describe('getIsEnabled([...Features], String)', async should => {
  const { assert } = should();

  const features = [
    {
      name: 'posts',
      isActive: true
    },
    {
      name: 'post-rating',
      isActive: false,
      dependencies: ['posts']
    },
    {
      name: 'post-rating-graph',
      isActive: true,
      dependencies: ['post-rating']
    },
    {
      name: 'reports',
      isActive: false
    },
    {
      name: 'report-rating',
      isActive: true,
      dependencies: ['reports']
    },
    {
      name: 'report-rating-graph',
      isActive: true,
      dependencies: ['report-rating']
    },
    {
      name: 'comments',
      isActive: true
    },
    {
      name: 'comment-rating',
      isActive: true,
      dependencies: ['comments']
    },
    {
      name: 'comment-rating-graph',
      isActive: true,
      dependencies: ['comment-rating']
    }
  ];
  deepFreeze(features);

  assert({
    given: 'features and a enabled feature name',
    should: 'return true',
    actual: getIsEnabled(features, 'posts'),
    expected: true
  });

  assert({
    given: 'features and a disabled feature name',
    should: 'return false',
    actual: getIsEnabled(features, 'post-rating'),
    expected: false
  });

  assert({
    given:
      'features and a enabled feature name that depends on a disabled feature',
    should: 'return false',
    actual: getIsEnabled(features, 'post-rating-graph'),
    expected: false
  });

  assert({
    given:
      'features and a enabled feature name that depends has a disabled feature in its dependency chain',
    should: 'return false',
    actual: getIsEnabled(features, 'report-rating-graph'),
    expected: false
  });

  assert({
    given:
      'features and a enabled feature name that has all enabled features in its dependency chain',
    should: 'return true',
    actual: getIsEnabled(features, 'comment-rating-graph'),
    expected: true
  });
});
