'use strict';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectRowToShowDetails, resetRow } from '../../actions/TableActions';

function mapStateToProps(state, ownProps) {
  // add Message fields to coumns
  const { requests: { visits } } = ownProps;

  return {
    visits: visits.value
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    selectRowToShowDetails: bindActionCreators(selectRowToShowDetails, dispatch),
    resetRow: bindActionCreators(resetRow, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps);
