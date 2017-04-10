import React from 'react';

import { Table, TableHeader } from '../../components';

export default class CategoryList extends React.Component {
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
    const { categories } = this.props.requests;
    const { columns, rows, selectRowToShowDetails, selectedRow } = this.props;

    // If booth request is pending and not refreshing, so loader icon
    if ((!categories.isCompleted && !categories.isRefreshing)) {
      return (
        <div className='slds-spinner--large'>
          <img src='/images/spinners/slds_spinner_brand.gif' alt='Loading...' />
        </div>
      );
    }

    return (
      <div>
        <TableHeader title=' Categories ' link='categories/new' />
        <Table
          columns={ columns }
          rows={ rows }
          rowOnClick={ selectRowToShowDetails }
          selectedRow={ selectedRow }
          link={'/categories/'}/>
      </div>
    );
  }
}
