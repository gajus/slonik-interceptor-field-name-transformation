// @flow

import camelcase from 'camelcase';
import {
  map
} from 'inline-loops.macro';
import type {
  FieldType,
  InterceptorType
} from 'slonik';

/**
 * @property format The only supported format is CAMEL_CASE.
 * @property test Tests whether the field should be formatted. The default behaviour is to include all fields that match ^[a-z0-9_]+$ regex.
 */
type ConfigurationType = {|
  +format: 'CAMEL_CASE',
  +test?: (field: FieldType) => boolean
|};

const underscoreFieldRegex = /^[a-z0-9_]+$/;

const underscoreFieldTest = (field: FieldType) => {
  return underscoreFieldRegex.test(field.name);
};

export default (configuration: ConfigurationType): InterceptorType => {
  if (configuration.format !== 'CAMEL_CASE') {
    throw new Error('Unsupported format.');
  }

  const fieldTest = configuration.test || underscoreFieldTest;

  return {
    transformRow: (context, query, row, fields) => {
      if (!context.formattedFields) {
        context.formattedFields = map(fields, (field) => {
          return {
            formatted: fieldTest(field) ? camelcase(field.name) : field.name,
            original: field.name
          };
        });
      }

      const formattedFields = context.formattedFields;

      const transformedRow = {};

      for (const field of formattedFields) {
        if (typeof field.formatted !== 'string') {
          throw new TypeError('Unexpected field name type.');
        }

        transformedRow[field.formatted] = row[field.original];
      }

      return transformedRow;
    }
  };
};
