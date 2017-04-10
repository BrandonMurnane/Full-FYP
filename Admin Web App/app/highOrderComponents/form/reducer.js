import _ from 'lodash';

import { LOAD, CHANGE, FOCUS, BLUR, INSERT, REMOVE, CLICK, SHOW_ERRORS, HIDE_ERRORS, CLEAR } from './actions';
import { mapPaths } from './util';

/**
 * Naive implementation of an immutable set. Clones and object and sets the value on the new
 * object.
 *
 * TODO: Keep unchanged references
 *
 * @param  {Object} object Object to set
 * @param  {String} path   Path of value to change
 * @param  {Any} value  Value to set to
 * @return {Object}        New object with updated value
 */
function immutableSet(object, path, value) {
  const newObject = _.cloneDeep(object);
  return _.set(newObject, path, value);
}

/**
 * Creates a form reducer for specific form id. Reducer manages three major parts of state. First is the
 * data object which contains the values for the form. Second is the buttons on the form. Third is
 * fields object which contains metadata about the form.
 * The three are seperated so other reducers can act upon the forms data without
 * being aware of the form metadata or buttons.
 *
 * @param  {String} fornId       ID of form. Should match the ID attribute on the form in the JSX
 * @param  {Object} initialState Optional intial state for object.
 * @return {Function}            Returns a reducer function that responds to form actions
 */
export default function formReducer() {
  const metaDataTemplate = {
    disabled: false,
    touched: false,
    focus: false,
    valid: true,
    showErrors: false,
    pristine: true
  };

  // Recursively scans initial values and constructs matching metadata about the object
  function initializeMetaData(formId, data, fields, buttons, pathPrefix=[]) {
    const metaData = mapPaths(data, fields, (value, path) => {
      const fieldMetaData = {
        form: formId,
        initialValue: value,
        ...metaDataTemplate
      };
      return fieldMetaData;
    }, pathPrefix);

    return metaData;
  }

  // else if (_.isBoolean(action.checked)) {
  //           // if checked, assume boolean value and set
  //           newValue = action.checked;
  //         }

  // Inner reducer responsible for updating field state in forms
  // Most form state is a simple update to value passed by change
  // If Change action was a check, and field is an array, then inserts the value checked (covers checkbox groups)
  function dataReducer(state, action) {
    const key = action.name;

    switch (action.type) {
      case CHANGE: {
        let newValue;
        const oldValue = _.get(state, key);

        // Handle array values and  checks/unchecks for checkbox groups that control arrays
        if (_.isArray(oldValue)) {
          if (action.checked) {
            newValue = [...oldValue, action.value];
          } else if (!action.checked) { //Uncheck so remove from array
            const index = oldValue.indexOf(action.value);
            newValue = [...oldValue.slice(0, index), ...oldValue.slice(index+1)];
          }
        } else if (_.isBoolean(oldValue)) {
          newValue = action.checked;
        } else {
          newValue = action.value;
        }

        return immutableSet(state, action.name, newValue);
      }
      case INSERT: {
        const dataArray = _.get(state, action.name);
        const newArray = [
          ...dataArray.slice(0, action.index),
          action.data,
          ...dataArray.slice(action.index, dataArray.length)
        ];
        return immutableSet(state, action.name, newArray);
      }
      case REMOVE: {
        const dataArray = _.get(state, action.name);
        const newArray = [
          ...dataArray.slice(0, action.index),
          ...dataArray.slice(action.index+1)
        ];
        return immutableSet(state, action.name, newArray);
      }
      default:
        return state;
    }
  }

  // Inner reducer responsible for updating metadata
  // Metadata updates are based on action type, and few can be manually set
  // Metadata is informaion like if the form has been touched, focus/blur, and if it should be showing errors
  function metaDataReducer(state, action) {
    switch (action.type) {
      case LOAD: {
        return initializeMetaData(action.form, action.data, action.fields, action.buttons);
      }
      case CHANGE: {
        const newMetaData = { ..._.get(state, action.name), pristine: false };
        return immutableSet(state, action.name, newMetaData);
      }
      case FOCUS: {
        const newMetaData = { ..._.get(state, action.name), focus: true, blur: false };
        return immutableSet(state, action.name, newMetaData);
      }
      case BLUR: {
        const newMetaData = { ..._.get(state, action.name), focus: false, blur: true, touched: true, showErrors: true };
        return immutableSet(state, action.name, newMetaData);
      }
      case CLEAR: {
        const newMetaData = { ..._.get(state, action.name), pristine: true, touched: false };
        return immutableSet(state, action.name, newMetaData);
      }
      case CLICK: {
        const newMetaData = { ..._.get(state, action.name), touched: true, showErrors: true };
        return immutableSet(state, action.name, newMetaData);
      }
      case SHOW_ERRORS: {
        // Hiding on specific field
        if (action.name) {
          const newMetaData = { ..._.get(state, action.name), showErrors: true};
          return immutableSet(state, action.name, newMetaData);
        }
        // Hiding on entire form
        else {
          const metaData = _.cloneDeepWith(state, (value, fieldKey) => {
            if (fieldKey === 'showErrors') return true;
          });
          return metaData;
        }
      }
      case HIDE_ERRORS: {
        // Hiding on specific field
        if (action.name) {
          const newMetaData = { ..._.get(state, action.name), showErrors: false };
          return immutableSet(state, action.name, newMetaData);
        }
        // Hiding on entire form
        else {
          const metaData = _.cloneDeepWith(state, (value, fieldKey) => {
            if (fieldKey === 'showErrors') return true;
          });
          return metaData;
        }
      }
      case INSERT: {
        const prefix = action.name + '.' + action.index;
        const metaData = initializeMetaData(action.data, action.fields, action.buttons, prefix);

        const metaDataArray = _.get(state, action.name);
        const newArray = [
          ...metaDataArray.slice(0, action.index),
          metaData,
          ...metaDataArray.slice(action.index, metaDataArray.length)
        ];
        return immutableSet(state, action.name, newArray);
      }
      case REMOVE: {
        const metaDataArray = _.get(state, action.name);
        const newArray = [
          ...metaDataArray.slice(0, action.index),
          ...metaDataArray.slice(action.index+1)
        ];
        return immutableSet(state, action.name, newArray);
      }
      case INSERT: {
        const prefix = action.name + '.' + action.index;
        const metaData = initializeMetaData(action.data, action.fields, action.buttons, prefix);
        return immutableSet(state, prefix, metaData);
      }
      case REMOVE: {
        const metaDataArray = _.get(state, action.name);
        const newArray = [...metaDataArray.slice(0, action.index), ...metaDataArray.slice(action.index+1)];
        return immutableSet(state, action.name, newArray);
      }
      default:
        return state;
    }
  }

  // Master reduce form forms that calles inner reducers
  // Form state is splilt into three peices
  // Data which controls field values
  // Metadata which controls field state (touched, blured, focus, errors)
  // And buttons which help support the form, submit, add new fields, etc
  function reducer(state={ data: {}, metaData: {}, isLoaded: false }, action) {
    switch (action.type){
      case LOAD:
        return {
          isLoaded: true,
          data: action.data,
          buttons: action.buttons.reduce((buttons, buttonName) => {
            buttons[buttonName] = {};
            return buttons;
          }, {}),
          metaData: metaDataReducer(state.metadata, action)
        };
      case CHANGE:
        return {
          ...state,
          data: dataReducer(state.data, action),
          buttons: state.buttons,
          metaData: metaDataReducer(state.metaData, action),
        };
      case FOCUS:
      case BLUR:
      case SHOW_ERRORS:
      case HIDE_ERRORS:
      case CLICK:
      case CLEAR:
        return {
          ...state,
          metaData: metaDataReducer(state.metaData, action),
        };
      case INSERT:
      case REMOVE:
        return {
          ...state,
          data: dataReducer(state.data, action),
          buttons: state.buttons,
          metaData: metaDataReducer(state.metaData, action),
        };
      default:
        return state;
    }
  }

  // Export Map Reducer that maps by forms by name
  return function mapper(state={}, action) {
    if (action.type.indexOf('@@form') !== 0) return state;
    switch (action.type) {
      case LOAD: {
        return { ...state, [action.form]: reducer(undefined, action) };
      }
      default: {
        if (!state[action.form]) throw Error(`${action.form} Not Loaded into Form State`);
        return { ...state, [action.form]: reducer(state[action.form], action) };
      }
    }
  };
}

