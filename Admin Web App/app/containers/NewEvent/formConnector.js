'use strict';
import * as selectors from '../../selectors/fieldSelectors';

import { connectForm } from '../../highOrderComponents/form';

const fields = [
  'key',
  'description',
  'speaker',
  'categoryKeys'
];


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
  formId: 'newEvent',
  options: selectors.EventSelector,
  initialData,
  fields,
  buttons,
  validator: mapDataToErrors
});
