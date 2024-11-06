import {
  useReactTable,
  ColumnDef,
  flexRender,
  getCoreRowModel,
} from '@tanstack/react-table';

type TableData = {
  col1: string;
  col2: string;
};

const data: TableData[] = [
  { col1: 'Hello', col2: 'World' },
  { col1: 'react-table', col2: 'rocks' },
  { col1: 'whatever', col2: 'you want' },
];

const columns: ColumnDef<TableData>[] = [
  {
    accessorKey: 'col1',
    header: 'Column 1',
  },
  {
    accessorKey: 'col2',
    header: 'Column 2',
  },
];

const UsersTable = () => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table style={{ border: 'solid 1px black' }}>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
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

export default UsersTable;
