import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import moment from 'moment';

import './TableRowDetails.scss';

export default class TableRowDetails extends React.Component {
  render() {
    const { columns, row, editOnClick, link, selectedRow } = this.props;
    let checkSelected =false;
    for (let i = selectedRow.length - 1; i >= 0; i--) {
      if (selectedRow[i]===row.id){
        checkSelected=true;
      }
    }
    const trClass = classNames({
      'slds-cell-shrink': true,
      'detailedTr': true,
      'hidden': !(checkSelected === true),
      'visible': (checkSelected === true)
    });
    const tdClass = classNames({
      'slds-cell-wrap': true,
      'detailedRow': true,
      'table-detailed-row-selected': (checkSelected === true)
    });
    const divClass = classNames({
      'large': !columns.length > 3,
      'small': columns.length > 3
    });
    return (
      <tr className={ trClass } key={ 'detailedRow' + row.id } ref={ 'detailedRow' + row.id }>
        <td className={ tdClass } colSpan='12' key={ 'detailedRow' + row.id }>
          <div>
          {
            columns.map((column) => {
              const value = _.get(row, column.name);
              return (
                <div className={divClass} key={'detailedRow' + column.name }>
                  <h1>{column.title} </h1>
                    {moment.isMoment(row[column.name]) ?
                  <span>{moment.utc(value).format('h:mm a, MMM Do YYYY z')}</span>:
                    value
                  }
                </div>
              );
            })
          }
          </div>
        </td>
      </tr>
    );
  }
}
