import React from 'react';
import { useTable, useSortBy, useFilters } from 'react-table';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { formatTimeSpent } from '../utils/timeUtils';

const CompletedTasksTable = ({ data }) => {
    const columns = React.useMemo(
        () => [
            {
                Header: 'Item Name',
                accessor: 'name', // accessor is the "key" in the data
            },
            {
                Header: 'Time Spent',
                accessor: 'timeSpent',
                Cell: ({ value }) => formatTimeSpent(value * 60),
              }
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({ columns, data }, useFilters, useSortBy); // Use the useFilters and useSortBy hooks

    return (
        <table {...getTableProps()} className="min-w-full">
            <thead> 
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()} className="theme-text-dark">
                        {headerGroup.headers.map(column => (
                            <th
                                {...column.getHeaderProps(column.getSortByToggleProps())}
                                className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                            >
                                {column.render('Header')}
                                <span className="inline-block align-middle pl-2">
                                    {column.isSorted
                                        ? column.isSortedDesc
                                            ? <FaArrowDown />
                                            : <FaArrowUp />
                                        : ''}
                                </span>

                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => (
                                <td {...cell.getCellProps()} className="px-6 py-2 whitespace-no-wrap">
                                    {cell.render('Cell')}
                                </td>
                            ))}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default CompletedTasksTable;
