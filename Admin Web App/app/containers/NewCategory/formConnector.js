'use strict';
import * as selectors from '../../selectors/fieldSelectors';
import { connectForm } from '../../highOrderComponents/form';

const fields = [
  'key',
  'description',
  'categoryKeys'
];


const buttons = [
  'submit'
];

const initialData = {
  key: '',
  description: '',
  categoryKeys: [],
};

function mapDataToErrors(data) {
  const errors = {};

  return errors;
}

export default connectForm({
  formId: 'newCategory',
  options: selectors.categorySelector,
  initialData,
  fields,
  buttons,
  validator: mapDataToErrors
});
