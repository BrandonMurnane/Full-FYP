'use strict';

import * as selectors from '../../selectors/fieldSelectors';
import { connectForm } from '../../highOrderComponents/form';

const fields = (state, ownProps) => {
  const fieldPaths = [
    'key',
    'description',
    'speaker',
    'categoryKeys'
  ];
  return fieldPaths;
};

const buttons = [
  'submit'
];

const initialData = {
  key: '',
  description: '',
  speaker: '',
  categoryKeys: [],
};

function mapDataToErrors(data) {
  const errors = {};

  return errors;
}

export default connectForm({
  formId: 'editEvent',
  options: selectors.EventSelector,
  initialData,
  fields,
  buttons,
  validator: mapDataToErrors
});
