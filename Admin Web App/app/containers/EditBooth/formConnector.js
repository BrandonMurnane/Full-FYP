'use strict';
import * as selectors from '../../selectors/fieldSelectors';
import { connectForm } from '../../highOrderComponents/form';

const fields = (state, ownProps) => {
  const fieldPaths = [
    'key',
    'description',
    'owner',
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
  owner: '',
  categoryKeys: [],
};

function mapDataToErrors(data) {
  const errors = {};

  return errors;
}

export default connectForm({
  formId: 'editBooth',
  options: selectors.BoothSelector,
  initialData,
  fields,
  buttons,
  validator: mapDataToErrors
});
