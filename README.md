# slonik-interceptor-field-name-transformation

[![Travis build status](http://img.shields.io/travis/gajus/slonik-interceptor-field-name-transformation/master.svg?style=flat-square)](https://travis-ci.org/gajus/slonik-interceptor-field-name-transformation)
[![Coveralls](https://img.shields.io/coveralls/gajus/slonik-interceptor-field-name-transformation.svg?style=flat-square)](https://coveralls.io/github/gajus/slonik-interceptor-field-name-transformation)
[![NPM version](http://img.shields.io/npm/v/slonik-interceptor-field-name-transformation.svg?style=flat-square)](https://www.npmjs.org/package/slonik-interceptor-field-name-transformation)
[![Canonical Code Style](https://img.shields.io/badge/code%20style-canonical-blue.svg?style=flat-square)](https://github.com/gajus/canonical)
[![Twitter Follow](https://img.shields.io/twitter/follow/kuizinas.svg?style=social&label=Follow)](https://twitter.com/kuizinas)

Transforms [Slonik](https://github.com/gajus/slonik) query result field names.

## Motivation

This interceptor removes the necessity to alias field names, e.g.

```js
connection.any(sql`
  SELECT
    id,
    full_name "fullName"
  FROM person
`);

```

Field name transformation uses `afterQuery` interceptor method to format field names.

## API

```js
import {
  createFieldNameTransformationInterceptor
} from 'slonik-interceptor-field-name-transformation';

```

```js
/**
 * @property format The only supported format is CAMEL_CASE.
 * @property test Tests whether the field should be formatted. The default behaviour is to include all fields that match ^[a-z0-9_]+$ regex.
 */
type ConfigurationType = {|
  +format: 'CAMEL_CASE',
  +test: (field: FieldType) => boolean
|};

(configuration: ConfigurationType) => InterceptorType;

```

## Example usage

```js
import {
  createPool
} from 'slonik';
import {
  createFieldNameTransformationInterceptor
} from 'slonik-interceptor-field-name-transformation';

const interceptors = [
  createFieldNameTransformationInterceptor({
    format: 'CAMEL_CASE'
  })
];

const connection = createPool('postgres://', {
  interceptors
});

connection.any(sql`
  SELECT
    id,
    full_name
  FROM person
`);

// [
//   {
//     id: 1,
//     fullName: 1
//   }
// ]

```
