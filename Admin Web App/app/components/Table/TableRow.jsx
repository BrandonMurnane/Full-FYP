import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import classNames from 'classnames';
import './TableRow.scss';

export default class TableRow extends React.Component {
  render() {
    const { columns, row, editOnClick, link, rowOnClick, selectedRow } = this.props;
    if (!row.id) {
      row.id = row.key;
    }

    const linkURL = link + row.id;

    let checkSelected =false;
    for (let i = selectedRow.length - 1; i >= 0; i--) {
      if (selectedRow[i]===row.id){
        checkSelected=true;
      }
    }
    const iconBaseUrl = '/icons/utility-sprite/svg/symbols.svg#';
    const iconRight = 'chevronright';
    const iconDown = 'chevrondown';
    const iconUrl = checkSelected === false? iconBaseUrl + iconRight : iconBaseUrl + iconDown;
    const tdClass = classNames({
      'slds-cell-wrap': true,
      'table-row-selected': (checkSelected === true)
    });
    return (
      <tr className='slds-cell-shrink' key={'row' + row.id}>

        <td id={ row.id } onClick={() => rowOnClick(row.id)} className={ tdClass }>
          <svg className='slds-icon expand-table-icon' id={ row.id }>
            <use xlinkHref={ iconUrl } />
          </svg>
        </td>

        { columns.map((column) => {
          let columnDataString = '';

          // if element of row is an Array, populate the string with each value joined by a comma
          if (row[column.name] instanceof Array) {
            columnDataString = row[column.name].join(', ');
          } else if (moment.isMoment(row[column.name])) {
            columnDataString = moment.utc(row[column.name]).format('h:mm a, MMM Do YYYY z');
          } else {
            columnDataString = row[column.name];
          }

          return (
            <td
              id={ row.id }
              className={ tdClass }
              onClick={() => rowOnClick(row.id)}
              data-label={ column.name }
              key={column.name + row.id} >
               <span>{ column.name ==='edit'?
                    <span>{
                        <Link to={ linkURL }>
                            <svg className='slds-icon editRow' onClick={ editOnClick }>
                              <use xlinkHref='/icons/utility-sprite/svg/symbols.svg#edit' />
                            </svg>
                        </Link>
                    }</span> :
                    <span> { columnDataString } </span>}
                </span>
            </td>
          );
        })}

      </tr>
    );
  }
}
