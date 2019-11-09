// @flow

import test from 'ava';
import createQueryContext from '../../helpers/createQueryContext';
import createFieldNameTransformationInterceptor from '../../../src/factories/createFieldNameTransformationInterceptor';

test('transforms field names to camelcase', (t) => {
  const interceptor = createFieldNameTransformationInterceptor({
    format: 'CAMEL_CASE',
  });

  const transformRow = interceptor.transformRow;

  if (!transformRow) {
    throw new Error('Unexpected state.');
  }

  const result = transformRow(
    createQueryContext(),
    {
      sql: 'SELECT 1',
      values: [],
    },
    {
      foo_bar: 1,
    },
    [
      {
        dataTypeId: 1,
        name: 'foo_bar',
      },
    ],
  );

  t.deepEqual(result, {
    fooBar: 1,
  });
});
