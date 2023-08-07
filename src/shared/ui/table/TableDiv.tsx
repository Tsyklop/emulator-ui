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

function TableDiv<TData>(props: TableProps<TData>) {
  const {data, loading, columns, ...other} = props;

  const table = useReactTable<TData>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange",
    getSortedRowModel: getSortedRowModel(),
    enableColumnResizing: true,
    getPaginationRowModel: getPaginationRowModel(),

    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
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
  }, [table.getRowModel, loading]);

  return (
    <div style={{overflowX: 'auto'}}>

      <div
          {...{
            className: 'divTable',
            style: {
              width: table.getTotalSize(),
            },
          }}
      >
        <div className="thead">
          {table.getHeaderGroups().map(headerGroup => (
              <div
                  {...{
                    key: headerGroup.id,
                    className: 'tr',
                  }}
              >
                {headerGroup.headers.map(header => (
                    <div
                        {...{
                          key: header.id,
                          className: 'th',
                          style: {
                            width: header.getSize(),
                          },
                        }}
                    >
                      {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                          )}
                      <div
                          {...{
                            onMouseDown: header.getResizeHandler(),
                            onTouchStart: header.getResizeHandler(),
                            className: `resizer ${
                                header.column.getIsResizing() ? 'isResizing' : ''
                            }`,
                            style: {
                              transform: header.column.getIsResizing()
                                  ? `translateX(${
                                      table.getState().columnSizingInfo.deltaOffset
                                  }px)` : ''
                            },
                          }}
                      />
                    </div>
                ))}
              </div>
          ))}
        </div>
        <div
            {...{
              className: 'tbody',
            }}
        >
          {table.getRowModel().rows.map(row => (
              <div
                  {...{
                    key: row.id,
                    className: 'tr',
                  }}
              >
                {row.getVisibleCells().map(cell => (
                    <div
                        {...{
                          key: cell.id,
                          className: 'td',
                          style: {
                            width: cell.column.getSize(),
                          },
                        }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </div>
                ))}
              </div>
          ))}
        </div>
      </div>

    </div>
  );
}

TableDiv.displayName = 'TableDiv';

export const TableDivMemo = React.memo(TableDiv) as typeof TableDiv;
