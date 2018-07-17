import { describe } from 'riteway';
import deepFreeze from 'deep-freeze';

import { getActiveFeatures } from './get-active-features';

describe('getActiveFeatures()', async should => {
  const { assert } = should('return an empty array');
  assert({
    given: 'no arguments',
    actual: getActiveFeatures(),
    expected: []
  });
});

describe('getActiveFeatures([])', async should => {
  const { assert } = should('return an empty array');
  assert({
    given: 'an empty array',
    actual: getActiveFeatures(),
    expected: []
  });
});

describe('getActiveFeatures([...Feature])', async should => {
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
    given: 'an array of features',
    should: 'return the correct active features',
    actual: getActiveFeatures(features),
    expected: ['posts', 'comments', 'comment-rating', 'comment-rating-graph']
  });
});
