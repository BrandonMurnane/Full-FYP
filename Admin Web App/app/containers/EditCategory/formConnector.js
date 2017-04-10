'use strict';
import * as selectors from '../../selectors/fieldSelectors';
import { connectForm } from '../../highOrderComponents/form';

const fields = (state, ownProps) => {
  const fieldPaths = [
    'key',
    'description',
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
  categoryKeys: [],
};

function mapDataToErrors(data) {
  const errors = {};

  return errors;
}

export default connectForm({
  formId: 'editCategory',
  options: selectors.categorySelector,
  initialData,
  fields,
  buttons,
  validator: mapDataToErrors
});
