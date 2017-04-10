'use strict';

import { connectForm } from '../../highOrderComponents/form';

const fields = (state, ownProps) => {
  const fieldPaths = [
    'key',
    'description'
  ];
  return fieldPaths;
};

const buttons = [
  'submit'
];

const initialData = {
  key: '',
  description: ''
};

function mapDataToErrors(data) {
  const errors = {};

  return errors;
}

export default connectForm({
  formId: 'editUserGroup',
  initialData,
  fields,
  buttons,
  validator: mapDataToErrors
});
