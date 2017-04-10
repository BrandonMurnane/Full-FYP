import React from 'react';
import TableRow from './TableRow';
import TableRowDetails from './TableRowDetails';
import './Table.scss';

export default class Table extends React.Component {

  render() {

    const { columns, rowOnClick, selectedRow, editOnClick, link, rows } = this.props;

    return (
      <table className='slds-table slds-table--bordered slds-max-medium-table--stacked tableContainer'>
        <thead>
          <tr className='slds-text-heading--label'>
            <th></th>
            { columns.main.map(cell => {
              return (
                <th scope='col' key={ cell.name }>
                  <span className='slds-truncate'>{ cell.title }</span>
                </th>);
            })}
          </tr>
        </thead>
        <tbody>
          { rows.map((row, index) => {
              // Return array of JSX elements instead of wrapping in div or span.
              // Divs and spans around <tr> are invalid and the browser removes them
              // This causes React to error since the browser manually maniplulated the DOM
            return ([
              <TableRow
                row={ row }
                columns={ columns.main }
                selectedRow= { selectedRow }
                rowOnClick={ rowOnClick }
                editOnClick={ editOnClick }
                link={ link } />,
              <TableRowDetails
                row={ row }
                columns={ columns.details }
                editOnClick={ editOnClick }
                selectedRow={ selectedRow }
                link={ link } />
            ]);
          })}
        </tbody>
      </table>
    );
  }
}
