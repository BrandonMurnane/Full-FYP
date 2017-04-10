import React from 'react';

import { Table, TableHeader } from '../../components';

export default class EventList extends React.Component {
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
    const { events } = this.props.requests;
    const { columns, rows, selectRowToShowDetails, selectedRow } = this.props;

    // If event request is pending and not refreshing, so loader icon
    if ((!events.isCompleted && !events.isRefreshing)) {
      return (
        <div className='slds-spinner--large'>
          <img src='/images/spinners/slds_spinner_brand.gif' alt='Loading...' />
        </div>
      );
    }

    return (
      <div>
        <TableHeader title=' Events ' link='events/new' />
        <Table
          columns={ columns }
          rows={ rows }
          rowOnClick={ selectRowToShowDetails }
          selectedRow={ selectedRow }
          link={'/events/'}/>
      </div>
    );
  }
}
