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
import NotFound from '../../components/UIComponents/EmptyState/EmptyState';
import IconMale from '../../components/Icons/IconMale';
import IconFemale from '../../components/Icons/IconFemale';
import IconQuestion from '../../components/Icons/IconQuestion';
import IconLoading from '../../components/Icons/IconLoading';
import IconError from '../../components/Icons/IconError';
import UsersTableSettings from './UsersTableSettings';

export type CustomColumnDef<TData> = ColumnDef<TData> & {
  header: string;
};

const UsersTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { data, error, isLoading } = useGetUsersQuery({ searchTerm });
  const [visibleColumns, setVisibleColumns] = useState<{
    [key: string]: boolean;
  }>({
    'Full Name': true,
    Birthday: true,
    Gender: true,
    Email: true,
    Phone: true,
    Username: true,
    'General info': true,
    Domain: true,
    IP: true,
    'Mac IP': true,
  });

  const toggleColumnVisibility = (columnName: string) => {
    if (['Full Name', 'Username', 'Email'].includes(columnName)) return;
    setVisibleColumns((prev) => ({
      ...prev,
      [columnName]: !prev[columnName],
    }));
  };

  const columns: CustomColumnDef<User>[] = useMemo(
    () =>
      [
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
                Bloodgroup: "{bloodGroup}"; Height: {Math.floor(height)};
                Weight: {Math.floor(weight)}; Hair color: {hair.color}
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
      ].filter((column) => visibleColumns[column.header]),
    [visibleColumns]
  );

  const table = useReactTable({
    data: data?.users ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const renderUsersTableContent = () => {
    if (isLoading) {
      return <NotFound icon={<IconLoading />} title='Loading Page' />;
    }

    if (error)
      return (
        <NotFound icon={<IconError />} title='Opps, something went wrong' />
      );

    if (!data || data.users.length === 0) {
      return <NotFound icon={<IconQuestion />} title='Not Found' />;
    }

    return (
      <table className='min-w-full table-auto border-collapse border-none'>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className='first:sticky first:left-0 p-[7px] bg-[#F7F7F8] border border-solid border-[#EAEDF0] leading-[12px] tracking-[0.2px] uppercase text-left font-semibold text-[10px] text-[#5F6E7C] border-t-0 first:border-l-0 last:border-r-0'
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
                  className='first:min-w-[180px] first:sticky first:left-0 py-[12px] px-[8px] bg-[#FFFFFF] border border-solid border-[#EAEDF0] text-left font-normal text-[13px] text-[#202932] whitespace-nowrap first:border-l-0 last:border-r-0'
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

  return (
    <>
      <SearchField value={searchTerm} onChange={handleSearchChange} />

      <div className='relative'>
        <UsersTableSettings
          columns={Object.keys(visibleColumns)}
          visibleColumns={visibleColumns}
          onToggleColumn={toggleColumnVisibility}
        />
        <div className='h-[550px] overflow-x-auto relative border border-solid border-[#EAEDF0] rounded-[12px] bg-[#f7faf9]'>
          {renderUsersTableContent()}
        </div>
      </div>
    </>
  );
};

export default UsersTable;
