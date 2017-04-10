'use strict';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectRowToShowDetails, resetRow } from '../../actions/TableActions';

const baseColumns = {
  main: [
    {
      title: 'Key',
      name: 'key'
    },
    {
      title: 'Related Categories',
      name: 'relatedCategorys'
    },
    {
      title: 'Edit',
      name: 'edit'
    }
  ],
  details: [
    {
      title: 'description',
      name: 'description'
    }
  ]
};

function mapStateToProps(state, ownProps) {
  // add Message fields to coumns
  const { requests: { categories } } = ownProps;

  const columns = { ...baseColumns };

  let rows = [];
  if (categories.value) {
    rows = categories.value;
  }

  return {
    selectedRow: state.selectedTableRow,
    columns,
    rows
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    selectRowToShowDetails: bindActionCreators(selectRowToShowDetails, dispatch),
    resetRow: bindActionCreators(resetRow, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps);
