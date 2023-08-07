import {
  Flex,
  Loader,
  Table as MantineTable,
  type TableProps as MantineTableProps,
} from '@mantine/core';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import React, {useCallback} from 'react';

export interface TableProps<TData> extends MantineTableProps {
  data: TData[];
  loading: boolean;
  columns: ColumnDef<TData, any>[];
}

/*function resolveHeaderCellSize<TData>(header: Header<TData, any>) : React.CSSProperties {

    const {size, minSize, maxSize} = header.column.columnDef;

    const result = {} as React.CSSProperties;

    if (size) {
        result.width = size;
    }

    if (minSize) {
       result.minWidth = minSize;
    }

    if (maxSize) {
        result.maxWidth = maxSize;
    }

    return result;

}*/

function Table<TData>(props: TableProps<TData>) {
  const {data, loading, columns, ...other} = props;

  const table = useReactTable<TData>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange",
    getSortedRowModel: getSortedRowModel(),
    enableColumnResizing: true,
    getPaginationRowModel: getPaginationRowModel(),
    /*debugTable: true,
    debugHeaders: true,
    debugColumns: true,*/
  });

  const renderTableContent = useCallback(() => {
    if (loading) {
      return [
        <tr key="no-data">
          <td style={{textAlign: 'center'}} colSpan={table.getAllColumns().length}>
            <Flex gap="xl" justify="center" align="center" direction="row" wrap="wrap">
              <Loader size="xs" />
            </Flex>
          </td>
        </tr>,
      ];
    }

    if (table.getRowModel().rows.length <= 0) {
      return [
        <tr key="no-data">
          <td style={{textAlign: 'center'}} colSpan={table.getAllColumns().length}>
            No Data
          </td>
        </tr>,
      ];
    }

    return table.getRowModel().rows.map((row) => (
      <tr key={row.id}>
        {row.getVisibleCells().map((cell) => (
          <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
        ))}
      </tr>
    ));
  }, [loading]);

  return (
      <MantineTable {...other} withBorder withColumnBorders>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>{renderTableContent()}</tbody>
      </MantineTable>
  );
}

Table.displayName = 'Table';

export const TableMemo = React.memo(Table) as typeof Table;
