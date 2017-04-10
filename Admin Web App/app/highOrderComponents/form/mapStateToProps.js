import { createSelector } from 'reselect';

export function(formName) {
  const formStateSelector = (state) => state.forms[formName];
  const fieldSelector = (state, ownProps) => ownProps.fields;
  const buttonSelector = (state, ownProps) => ownProps.buttons;
  const optionSelector = (state, ownProps) => ownProps.options;
  const selectors = [formStateSelector, fieldSelector, buttonSelector, optionSelector]

  return createSelector(selectors, (form, fields, buttons, options) => {

  });

  // Returns selector to be passed to redux's mapStateToProps function
  return function(state, ownProps) {
    const formState = state.forms[formName];

    const { data, metaData } = formState;
    formSelector, optionsSelector, validator, fields, buttons

    const { fields, buttons, options, validator } = ownProps;

  }
  , state, fields, buttons, options
}
