import _ from 'lodash';
import { mapPaths } from './util';

// Creates the form.fields attribute on the form property
// Algamates the data and meta data to create properties that can be injected in form components
// Also binds event handlers to the form, fields, and field options
export function createMergePropsSelector(formId) {
  return function mergeProps(stateProps, dispatchProps, ownProps) {
    const { formActions } = dispatchProps;
    const { data, fieldPaths, buttonPaths, fields, buttons, errors, formState } = stateProps;

    // combine form raw data, errors, state, and handlers
    const form = {
      ...formState,
      fields: {},
      buttons: {},
      data,
      errors,
      handleLoad: (loadData) => formActions.handleLoad(formId, fieldPaths, buttonPaths, loadData),
      // alias Load with Reset, they are the same now, but may diverge
      handleReset: (loadData) => formActions.handleLoad(formId, fieldPaths, buttonPaths, loadData),
      showErrors: () => formActions.showFormErrors(formId),
      hideErrors: () => formActions.hideErrors(formId),
    };

    // Assemble form fields by combining values and event handlers
    form.fields = mapPaths(fields, fieldPaths, (field, path) => {
      const mergedField = { ...field,
        onChange: (valueOrEvent) => formActions.onChange(formId, field.name, valueOrEvent),
        onFocus: () => formActions.onFocus(formId, field.name),
        onBlur: () => formActions.onBlur(formId, field.name),
        onClick: () => formActions.onClick(formId, field.name),
        showErrors: () => formActions.showErrors(formId, field.name),
        hideErrors: () => formActions.hideErrors(formId, field.name),
        clear: () => formActions.clear(formId, field.name)
      };

      // Inject handlers into options
      if (_.isArray(field.options)) {
        mergedField.options = field.options.map((option) => {
          const mergedOption = { ...option,
            showErrors: () => formActions.showErrors(formId, option.name),
            hideErrors: () => formActions.hideErrors(formId, option.name)
          };

          return mergedOption;
        });
      }

      return mergedField;
    });

    // Assemble buttons by combining values and event handlers
    form.buttons = mapPaths(buttons, buttonPaths, (button, path) => {

      // inject handlers into field
      const mergedButton = {
        ...button,
        onClick: (event) => formActions.onClick(formId, event.currentTarget.name || button.name),
        showErrors: () => formActions.showErrors(formId, event.currentTarget.name),
        hideErrors: () => formActions.hideErrors(formId, event.currentTarget.name),
        clear: () => formActions.clear(formId, event.currentTarget.name)
      };

      return mergedButton;
    });

    // Gets all of the fields that are arrays of items
    const arrayFields = [];
    fieldPaths.map((path) => {
      // Step through each node in the path for an array node
      // eg finds 'mid[]'' in 'outer.mid[].inner'
      path.split('.').reduce((acc, pathNode) => {
        if (pathNode.indexOf('[]') !== -1) {
          arrayFields.push([...acc, pathNode].join('.'));
        }
        return [...acc, pathNode];
      }, []);
    });

    // dedupes any paths
    const uniqueArrayFields = _.uniqWith(arrayFields, _.isEqual);

    // Inset handlers for adding and remove items from an array of fields
    uniqueArrayFields.map((arrayFieldPath) => {
      // remove [] from end of field path
      const arrayFieldPathStriped = arrayFieldPath.replace('[]', '');

      // if the array is undefined, set to it empty array
      // this fixes empty arrays with no initial value
      if (!_.get(form.fields, arrayFieldPathStriped)) _.set(form.fields, arrayFieldPathStriped, []);
      const arrayField = _.get(form.fields, arrayFieldPathStriped)
      // Finds any nested fields or buttons in array
      // Passes them as default as default parameters when creating a new item in the array
      // eg finds 'outer.mid[].inner' and 'outer.mid[].inne2'
      // for path 'outer.mid[]''
      const subFields = [];
      fieldPaths.map((path) => {
        if (path.indexOf(arrayFieldPath) === 0) {
          subFields.push(path.slice(arrayFieldPath.length + 1));
        }
      });

      const subButtons= [];
      buttonPaths.map((path) => {
        if (path.indexOf(arrayFieldPath) === 0) {
          subButtons.push(path.slice(arrayFieldPath.length + 1));
        }
      });

      // Defines addField and removeField action creators directly on array
      // Since definition is directly on the array, need to use Object.defineProperty() instead of
      // normal object literal syntax for defining new fiews (object.propertyName = propertyValue)
      Object.defineProperty(arrayField, 'addField', {
        value: (addData) => {
          // defaults inserts to the end
          const arrayIndex = addData.index === undefined ? arrayField.length : addData.index ;
          formActions.addField(formId, arrayFieldPathStriped, addData, arrayIndex, subFields, subButtons);
        }
      });
      Object.defineProperty(arrayField, 'removeField', {
        value: (index) => {
          // defaults removes to the last item
          const arrayIndex = index === undefined ? arrayField.length - 1: index ;
          formActions.removeField(formId, arrayFieldPathStriped, arrayIndex);
        }
      });

      arrayField.map((item, index) => {
        item.removeField = () => {
          formActions.removeField(formId, arrayFieldPathStriped, index);
        };
      });
    });

    return { form, ...ownProps };
  };
}
