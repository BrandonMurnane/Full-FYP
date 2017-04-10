'use strict';

import { connectForm } from '../../highOrderComponents/form';

const fields = [
  'key',
  'description'
];


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
  formId: 'newUserGroup',
  initialData,
  fields,
  buttons,
  validator: mapDataToErrors
});
