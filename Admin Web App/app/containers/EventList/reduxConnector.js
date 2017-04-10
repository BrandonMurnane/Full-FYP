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
      title: 'Category Keys',
      name: 'categoryKeys'
    },
    {
      title: 'Speaker',
      name: 'speaker'
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
  const { requests: { events } } = ownProps;

  const columns = { ...baseColumns };

  let rows = [];
  if (events.value) {
    rows = events.value;
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
