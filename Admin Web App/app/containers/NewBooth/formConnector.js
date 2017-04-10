'use strict';
import * as selectors from '../../selectors/fieldSelectors';

import { connectForm } from '../../highOrderComponents/form';

const fields = [
  'key',
  'description',
  'owner',
  'categoryKeys'
];


const buttons = [
  'submit'
];

const initialData = {
  key: '',
  description: '',
  owner: '',
  categoryKeys: [],
};

function mapDataToErrors(data) {
  const errors = {};

  return errors;
}

export default connectForm({
  formId: 'newBooth',
  options: selectors.BoothSelector,
  initialData,
  fields,
  buttons,
  validator: mapDataToErrors
});
