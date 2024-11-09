import { useState, useMemo, ChangeEvent } from 'react';
import { useGetUsersQuery } from '../../services/users';
import { User } from '../../services/types';
import {
  useReactTable,
  ColumnDef,
  flexRender,
  getCoreRowModel,
} from '@tanstack/react-table';
import moment from 'moment';
import SearchField from '../../components/UIComponents/SearchField/SearchField';
import IconMale from '../../components/Icons/IconMale';
import IconFemale from '../../components/Icons/IconFemale';

const UsersTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { data, error, isLoading } = useGetUsersQuery({ searchTerm });

  const columns: ColumnDef<User>[] = useMemo(
    () => [
      {
        header: 'Full Name',
        cell: ({ row }) => {
          const { firstName, lastName, image } = row.original;

          return (
            <div className='flex flex-row items-center'>
              <img
                src={image}
                className='w-[32px] h-[32px] mr-[4px] border border-solid border-[rgba(0, 0, 0, 0.34)] rounded-full'
                alt=''
              />
              <span className='font-medium'>
                {firstName} {lastName}
              </span>
            </div>
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
                <div className='flex flex-row items-center'>
                  <IconMale /> Male
                </div>
              ) : (
                <div className='flex flex-row items-center'>
                  <IconFemale /> Female
                </div>
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

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>An error occurred: {error.toString()}</p>;

  if (!data || data.users.length === 0) {
    return <p>No data available</p>;
  }

  return (
    <>
      <SearchField value={searchTerm} onChange={handleSearchChange} />
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className='p-[7px] bg-[#F7F7F8] border border-solid border-[#EAEDF0] leading-[12px] tracking-[0.2px] uppercase text-left font-semibold text-[10px] text-[#5F6E7C]'
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
                  className='py-[12px] px-[8px] bg-[#FFFFFF] border border-solid border-[#EAEDF0] text-left font-normal text-[13px] text-[#202932]'
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UsersTable;
