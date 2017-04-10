import { createSelector } from 'reselect';
import _ from 'lodash';

import { mapPaths } from './util'

// Creates selector function that merges form data, metadata, options, and errors
export function createStateToPropsSelector(formId, fields, buttons, options, validator) {
  const propSelector = (state, ownProps) => ownProps;
  const formSelector = (state) => state.forms[formId] || {};

  /**
   * Begin State Selectors
   * Selectors read from redux state by id
   */

  // Form data selector
  // Selects form current values
  const formDataSelector = createSelector(formSelector, (form) => form.data || {});

  // Form metadata selector
  // Selects metadata such as focused, blurred, pristine, etc
  const formMetaDataSelector = createSelector(formSelector, (form) => form.metaData || {});

  // Form button selector
  // Selects button state, just a list of buttons, get errors attached to them
  const formButtonSelector = createSelector(formSelector, (form) => form.buttons || {});

  // Selector of isLoaded
  const formStateSelector = createSelector(formSelector, (form) => {
    const { isLoaded } = form;
    return { isLoaded };
  });

  /** End State Selectors **/

  /**
   * Begin Config Selectors
   * Configuration parameters passed to formConnector
   * Most configuration parameters can be an array/object or function
   * If array/object, just pass it on, otherwise create selector for it
   *
   * Field, buttons, and options get standard (state, ownProps)
   * Validator gets (form.data, ownProps)``
   *
   * Use selector if fields are dynamic based on state, like stored state from API response
   */

  /**
   * Field Selectors
   * Can either be plain array for function
   *
   * Recieves (state, ownProps) as function
   */
  const fieldPathsSelector = Array.isArray(fields) ? () => fields : fields;

  /**
   * Button Selectors
   * Can either be plain array for function
   *
   * Recieves (state, ownProps) as function
   */
  const buttonPathsSelector = Array.isArray(buttons) ? () => buttons : buttons;

  /**
   * Options Selector
   * Can either be plain object, function, or undefined
   * If defined, return no options
   *
   * Recieves (state, ownProps) as function
   */
  let optionsSelector;
  if (_.isFunction(options)) {
    optionsSelector = (state, ownProps) => {
      try {
        return options(state, ownProps);
      } catch (e) {
        console.error(e);
        return {};
      }
    };
  }
  if (_.isPlainObject(options)) optionsSelector = () => options;
  if (_.isUndefined(options)) optionsSelector = () => ({});

  /** End of Configuration Selectors */


  /**
   * Validation Selector
   * Checks for any invalid form state and produces `error` object
   * Must be funciton
   * Recieves (form.data, ownProps)
   */
  // Error selector, ouput of validator run agaisnt formData
  const errorsSelector = createSelector(formSelector, propSelector, (form, ownProps) => {
    if (!form || _.isEmpty(form.data) || !validator || !form.isLoaded) return {};
    try {
      return validator(form.data, ownProps);
    } catch (e) {
      console.error(e);
      return {};
    }
  });


  /**
   * Start of Field Selectors
   *
   * Field Selectors combine the Form State and Configuration
   * to create objects that are merged into single form object
   * in mergePropSelector file
   */

  // Creates properties for an options field. Tries best guesses at if the form should be checked
  // and same defaults for null (none) fields
  function optionPropertiesSelector(name, value, stateOptions) {
    // if no options are set or they are invalid return empty
    if (!stateOptions || !Array.isArray(stateOptions) || stateOptions.length < 1) return [];

    // Parses options stored in state and creates an object that can be injected into
    // React Option components
    return stateOptions.map((stateOption) => {
      let viewOption = {
        name,
        checked: false
      };

      // If options are a string then make text and value the same
      // If null then set key to be none, text to be None, and value to null
      // Else gets complex value set for option
      let optionKey;
      if (_.isString(stateOption)) {
        optionKey = stateOption;
        viewOption.text = stateOption;
        viewOption.value = stateOption;
        viewOption.id = name + '-' + optionKey;
      } else if (_.isBoolean(stateOption)) {
        optionKey = stateOption;
        viewOption.text = stateOption ? 'Yes' : 'No';
        viewOption.value = stateOption;
        viewOption.id = name + '-' + optionKey;
      } else if (_.isNull(stateOption)) {
        optionKey = null;
        viewOption.text = 'None';
        viewOption.value = 'null';
        viewOption.id = name + '-null';
      } else if (_.isPlainObject(stateOption)) {
        viewOption = { ...viewOption, ...stateOption };
        optionKey = viewOption.value;
      } else {
        optionKey = stateOption.value;
        viewOption.text = stateOption.text;
        viewOption.value = stateOption.value;
        viewOption.id = name + '-' + optionKey;
      }


      // Compares the option key to the value of the field
      // If value is an array (group) tried to see if contained
      // Otherways just does straight key matching
      let contains = false;
      if (Array.isArray(value)) {
        // checks to see if option is in the array
        contains = (value.indexOf(optionKey) > -1);
      } else {
        // checks for simple match
        contains = (value === optionKey);
      }

      // Sets both alias for checked and selected
      // Handles Mutli selects and checkbox groups
      if (contains) {
        viewOption.selected = true;
        viewOption.checked = true;
      }

      return viewOption;
    });
  }

  // Form selector that produces a single prop try that describes to form and can
  // be directly mapped to JSX
  // Combines form data, metadata, errors, and options
  const fieldStateSelector = createSelector(
    formDataSelector,
    formMetaDataSelector,
    fieldPathsSelector,
    errorsSelector,
    optionsSelector,
    (formData, metaData, fieldPaths, errors, options) => {

      // Returns fiends with normalized paths
      // FieldOne.Array[].InnerField
      const fieldsProperties = {};

      mapPaths(formData, fieldPaths, (value, pathArray) => {

        const name = pathArray.join('.');
        const fieldMetaData = _.get(metaData, pathArray);
        // const fieldMetaData = {}
        const fieldProperties = {
          name,
          value,
          errors: [],
          ...fieldMetaData
        };

        // Tries to match actual path to generaliezd option path (list[1].field to list[].field)
        // If the last entry in the path is a number, replace it with [] for matching to option selector
        const optionPath = name.replace(/\.\d/g, '[]');
        const fieldOptions = options[optionPath];
        if (fieldOptions) {
          fieldProperties.options = optionPropertiesSelector(name, value, fieldOptions);
        }

        // if field options and is not set, and value is boolean, inject true/false options for use in
        // radito buttons
        if (!fieldProperties.options && _.isBoolean(value)) {
          fieldProperties.options = optionPropertiesSelector(name, value, [true, false]);
        }

        const fieldErrors = _.get(errors, pathArray);
        if (fieldErrors) {
          fieldProperties.errors = _.isArray(fieldErrors) ? fieldErrors : [fieldErrors];
        }

        _.set(fieldsProperties, pathArray, fieldProperties);
      });

      return fieldsProperties;
  });

  const buttonStateSelector = createSelector(
    formButtonSelector,
    formMetaDataSelector,
    buttonPathsSelector,
    errorsSelector,
    optionsSelector,
    (formButtons, metaData, buttonPaths, errors, options) => {
      const buttonsProperties = {};

      mapPaths(formButtons, buttonPaths, (value, pathArray) => {
        const name = pathArray.join('.');
        // const buttonMetaData = _.get(metaData, pathArray);
        const buttonMetaData = {};

        const buttonProperties = {
          name,
          value,
          errors: [],
          ...buttonMetaData
        };

        // Tries to match actual path to generaliezd option path (list[1].field to list[].field)
        // If the last entry in the path is a number, replace it with [] for matching to option selector
        const optionPath = name.replace(/\.\d/g, '[]');
        const buttonOptions = options[optionPath];
        if (buttonOptions) {
          buttonProperties.options = optionPropertiesSelector(name, value, buttonOptions);
        }

        const buttonErrors = _.get(errors, pathArray);
        if (buttonErrors) {
          buttonProperties.errors = _.isArray(buttonErrors) ? buttonErrors : [buttonErrors];
        }
        _.set(buttonsProperties, pathArray, buttonProperties);
      });

      return buttonsProperties;
    }
  );

  // Returns selector that selects from (state, ownProps) and returns form HOC props
  // Props are used by mergePropSelector to inject actions
  return createSelector(
    propSelector,
    formDataSelector,
    fieldPathsSelector,
    buttonPathsSelector,
    fieldStateSelector,
    buttonStateSelector,
    errorsSelector,
    formStateSelector,
    (props, data, fieldPaths, buttonPaths, fields, buttons, errors, formState) => ({
      data, fieldPaths, buttonPaths, fields, buttons, errors, formState
    })
  );
}
