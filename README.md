# feature-toggles

Low-level feature toggle tools for Node and browsers.

## Install

```
npm install --save @paralleldrive/feature-toggles
```

## Use it

```js
import {
  getCurrentActiveFeatureNames,
  isActiveFeatureName
} from '@paralleldrive/feature-toggles';

const initialFeatures = [
  {
    name: 'comments',
    isActive: true
  },
  {
    name: 'ratings',
    isActive: false
  },
  {
    name: 'faq',
    isActive: false
  },
  {
    name: 'help'
    isActive: false
  }
];

const req = { query: { ft: 'ratings,help' } };

const activeFeaturesNames = getCurrentActiveFeatureNames({
  initialFeatures,
  req
});

const isCommentsActive = isActiveFeatureName('comments', activeFeaturesNames); // true
const isRatingsActive = isActiveFeatureName('ratings', activeFeaturesNames); // true ( enabled via req query object )
const isFAQActive = isActiveFeatureName('faq', activeFeaturesNames); // false
const isHelpActive = isActiveFeatureName('help', activeFeaturesNames); // true ( enabled via req query object )
```

## API

### Interfaces

#### Feature

```js
interface Feature {
  name: String,
  isActive: false,
  dependencies?: [...String]
}
```

### Functions

#### activateFeatures

`[...String] => [...Feature] => [...Feature]`

Activates Features by name of the provided array of Features.

```js
const initialFeatures = [
  { name: 'foo', isActive: true },
  { name: 'bar', isActive: false },
  { name: 'baz', isActive: false }
];

activateFeatures(['bar', 'baz'])(initialFeatures);

//
// [
//   { name: 'foo', isActive: true },
//   { name: 'bar', isActive: true },
//   { name: 'baz', isActive: true },
// ]
//
```

#### getActiveFeatureNames

`([...Feature]) => [...String]`

Takes an array of feature objects and returns an array of active feature names. This function respects Feature dependencies.

#### getBrowserQueryFeatureNames

Takes a `window.location.search` string and returns an array of active feature names. If search is not provided will grab the global `window.location.search` if available.

`(search?) => [...String]`

```js
const search = '?ft=foo,bar,baz';

getBrowserQueryFeatureNames(search); // ['foo', 'bar', 'baz']
```

#### getCurrentActiveFeatureNames

Takes an array of initialFeatures, a req object, and a `window.location.search` string and returns an array of active feature names. If search is not provided will grab the global `window.location.search` if available. This function respects Feature dependencies.

`({ initialFeatures = [...Feature], req? , search? }) => [...String])]`

```js
const initialFeatures = [
  { name: 'foo', isActive: true },
  { name: 'bar', isActive: false },
  { name: 'baz', isActive: false },
  { name: 'other': isActive: false }
]

getCurrentActiveFeatureNames({ initialFeatures }); // ['foo']

const req = {
  query:{
    ft='bar,baz'
  }
};

getCurrentActiveFeatureNames({ initialFeatures, req }); // ['foo', 'bar', 'baz']
```

#### getReqQueryFeatureNames

`(req = {}) => [...String]`

Takes a [req object](https://expressjs.com/en/api.html#req.query) and returns an array of enabled feature names.

```js
const req = {
  query:{
    ft='foo,bar,help'
  }
};

getReqQueryFeatureNames(req); // ['foo', 'bar', 'help']
```

#### getQueryFeatureNames

`(query = {}) => [...String]`

Takes a [query object](https://nodejs.org/api/url.html) and returns an array of enabled feature names.

```js
const query = { ft='foo,bar,help' }
getQueryFeatureNames(query); // ['foo', 'bar', 'help']
```

#### isActiveFeatureName

`String => [...String] => boolean`

Returns true if a feature name is in the array else it returns false.

```js
const currentFeatures = ['foo', 'bar', 'baz'];
isActiveFeatureName('bar', currentFeatures); // true
isActiveFeatureName('cat', currentFeatures); // false
```

#### mergeFeatureNames

`(...[...String]) => [...String]`

Merge feature names without duplicating.

```js
const currentFeatures = ['foo', 'bar', 'baz'];
mergeFeatureNames(currentFeatures, ['fish', 'bar', 'cat']); // ['foo', 'bar', 'baz', 'fish', 'cat']
```

#### removeFeatureNames

`([...String], [...String]) => [...String]`

Removes feature names

```js
const currentFeatures = ['foo', 'bar', 'baz', 'cat'];
removeFeatureNames(currentFeatures, ['fish', 'bar', 'cat']); // ['foo', 'baz']
```
