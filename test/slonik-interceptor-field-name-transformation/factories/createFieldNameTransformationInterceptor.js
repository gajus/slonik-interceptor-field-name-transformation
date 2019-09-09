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
        columnID: 1,
        dataTypeID: 1,
        dataTypeModifier: 1,
        dataTypeSize: 1,
        format: '',
        name: 'foo_bar',
        tableID: 1,
      },
    ]
  );

  t.deepEqual(result, {
    fooBar: 1,
  });
});
