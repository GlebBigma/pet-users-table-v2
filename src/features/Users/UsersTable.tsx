import { useMemo } from 'react';
import { useGetUsersQuery } from '../../services/users';
import { User } from '../../services/types';
import {
  useReactTable,
  ColumnDef,
  flexRender,
  getCoreRowModel,
} from '@tanstack/react-table';
import moment from 'moment';
import IconMale from '../../components/Icons/IconMale';
import IconFemale from '../../components/Icons/IconFemale';

const UsersTable = () => {
  const { data, error, isLoading } = useGetUsersQuery();

  const columns: ColumnDef<User>[] = useMemo(
    () => [
      {
        header: 'Full Name',
        cell: ({ row }) => {
          const { firstName, lastName, image } = row.original;

          return (
            <>
              <img src={image} alt='' />
              {firstName}
              {lastName}
            </>
          );
        },
      },
      {
        header: 'Birthday',
        cell: ({ row }) => {
          const { birthDate, age } = row.original;
          return (
            <>
              {moment(birthDate).format('DD.MM.YYYY')} ({age} years old)
            </>
          );
        },
      },
      {
        header: 'Gender',
        cell: ({ row }) => {
          const { gender } = row.original;
          return (
            <>
              {gender === 'male' ? (
                <>
                  <IconMale /> Male
                </>
              ) : (
                <>
                  <IconFemale /> Female
                </>
              )}
            </>
          );
        },
      },
      {
        header: 'Email',
        accessorKey: 'email',
      },
      {
        header: 'Phone',
        accessorKey: 'phone',
      },
      {
        header: 'Username',
        accessorKey: 'username',
      },
      {
        header: 'General info',
        cell: ({ row }) => {
          const { bloodGroup, height, weight, hair } = row.original;
          return (
            <>
              Bloodgroup: "{bloodGroup}"; Height: {Math.floor(height)}; Weight:{' '}
              {Math.floor(weight)}; Hair color: {hair.color}
            </>
          );
        },
      },
      {
        header: 'Domain',
        accessorKey: 'userAgent',
      },
      {
        header: 'IP',
        accessorKey: 'ip',
      },
      {
        header: 'Mac IP',
        accessorKey: 'macAddress',
      },
    ],
    []
  );

  const table = useReactTable({
    data: data?.users ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>An error occurred: {error.toString()}</p>;

  if (!data || data.users.length === 0) {
    return <p>No data available</p>;
  }

  return (
    <table style={{ border: 'solid 1px black' }}>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                style={{
                  borderBottom: 'solid 3px red',
                  background: 'aliceblue',
                  color: 'black',
                  fontWeight: 'bold',
                }}
              >
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
              <td
                key={cell.id}
                style={{
                  padding: '10px',
                  border: 'solid 1px gray',
                  background: 'papayawhip',
                }}
              >
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
