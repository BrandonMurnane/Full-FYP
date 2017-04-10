import { bindActionCreators } from 'redux';
import { connect as connectRedux } from 'react-redux';

import { connectFormHOC } from './connectFormHOC.jsx';
import { createStateToPropsSelector } from './stateToPropsSelector';
import { createMergePropsSelector } from './mergePropsSelector';
import * as formActions from './actions';

export function connectForm(config) {
  const { formId, fields, initialData, buttons, options, validator } = config;

  return function(WrappedComponent) {
    const FormConnectedComponent = connectFormHOC(initialData)(WrappedComponent);

    const mapStateToProps = createStateToPropsSelector(formId, fields, buttons, options, validator);
    function mapDispatchToProps(dispatch) {
      return { formActions: bindActionCreators(formActions, dispatch) };
    }
    const mergeProps = createMergePropsSelector(formId);

    const ReduxConnectedComponent = connectRedux(mapStateToProps, mapDispatchToProps, mergeProps)(FormConnectedComponent);
    return ReduxConnectedComponent;
  };
}
