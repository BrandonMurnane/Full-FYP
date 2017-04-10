import React from 'react';

import { Table, TableHeader } from '../../components';

export default class UserGroupList extends React.Component {
  static propTypes = {
    requests: React.PropTypes.object,
    columns: React.PropTypes.object,
    rows: React.PropTypes.array,
    selectRowToShowDetails: React.PropTypes.func,
    selectedRow: React.PropTypes.array,
    resetRow: React.PropTypes.func
  };

  componentWillUnmount() {
    const { resetRow }=this.props;
    resetRow();
  }

  render() {
    const { userGroups } = this.props.requests;
    const { columns, rows, selectRowToShowDetails, selectedRow } = this.props;

    // If booth request is pending and not refreshing, so loader icon
    if ((!userGroups.isCompleted && !userGroups.isRefreshing)) {
      return (
        <div className='slds-spinner--large'>
          <img src='/images/spinners/slds_spinner_brand.gif' alt='Loading...' />
        </div>
      );
    }

    return (
      <div>
        <TableHeader title=' UserGroups ' link='userGroups/new' />
        <Table
          columns={ columns }
          rows={ rows }
          rowOnClick={ selectRowToShowDetails }
          selectedRow={ selectedRow }
          link={'/userGroups/'}/>
      </div>
    );
  }
}
