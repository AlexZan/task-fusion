import React, { useState, useMemo } from 'react';
import { createColumnHelper, getCoreRowModel, useReactTable, flexRender, getSortedRowModel } from '@tanstack/react-table';
import { FaUndo, FaSortUp, FaSortDown, FaSort } from 'react-icons/fa';

import { formatTimeSpent } from '../utils/timeUtils';

const CompletedTasksTable = ({ data, handleUndoCompletion }) => {
  const [hoveredRowId, setHoveredRowId] = useState(null);
  const [sorting, setSorting] = useState([]);

  const columnHelper = createColumnHelper();

  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: 'Item Name',
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('timeSpent', {
        header: ({ column }) => (
            <div
              style={{ display: 'flex', alignItems: 'center' }}
              className={column.getCanSort() ? 'cursor-pointer select-none' : ''}
              onClick={column.getToggleSortingHandler()}
            >
              Time Spent&nbsp;
              {column.getIsSorted() === 'asc' ? (
                <FaSortUp />
              ) : column.getIsSorted() === 'desc' ? (
                <FaSortDown />
              ) : (
                <FaSort />
              )}
            </div>
          ),
          
        cell: info => formatTimeSpent(info.getValue() * 60),
      }),
      columnHelper.accessor('id', {
        header: 'Actions',
        cell: info => (
          hoveredRowId === info.row.original.id && (
            <button onClick={() => handleUndoCompletion(info.row.original.id)} className="text-gray-500 hover:text-red-500 duration-300">
              <FaUndo size={14} />
            </button>
          )
        ),
      }),
    ],
    [hoveredRowId, columnHelper, handleUndoCompletion]
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });


  return (
    <table className="min-w-full">
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id}>
                {flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr
            key={row.id}
            onMouseEnter={() => setHoveredRowId(row.original.id)}
            onMouseLeave={() => setHoveredRowId(null)}
          >
            {row.getVisibleCells().map(cell => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CompletedTasksTable;
