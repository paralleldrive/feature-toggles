export const createFeatures = () => [
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
    name: 'help',
    isActive: false
  },
  {
    name: 'help-rating',
    isActive: true,
    dependencies: ['help']
  },
  {
    name: 'help-rating-graph',
    isActive: true,
    dependencies: ['help-rating']
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
