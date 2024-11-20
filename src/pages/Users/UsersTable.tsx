import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment/moment';
import { flexRender, getCoreRowModel, Row, useReactTable } from '@tanstack/react-table';
import { CustomColumnDef } from './Users.tsx';
import { User, UsersData } from '../../app/services/users.ts';
import NotFound from '../../components/UIComponents/EmptyState/EmptyState.tsx';
import IconLoading from '../../components/Icons/IconLoading.tsx';
import IconError from '../../components/Icons/IconError.tsx';
import IconQuestion from '../../components/Icons/IconQuestion.tsx';
import IconMale from '../../components/Icons/IconMale.tsx';
import IconFemale from '../../components/Icons/IconFemale.tsx';

interface UsersTableProps {
  data: UsersData | undefined;
  error: unknown;
  isLoading: boolean;
  visibleColumns: { [key: string]: boolean };
}

const UsersTable: React.FC<UsersTableProps> = ({data, error, isLoading, visibleColumns}) => {
  const navigate = useNavigate();

  const columns: CustomColumnDef<User>[] = useMemo(
    () =>
      [
        {
          header: 'Full Name',
          cell: ({row}: { row: Row<User> }) => {
            const {firstName, lastName, image} = row.original;

            return (
              <div className="flex flex-row items-center">
                <img
                  src={image}
                  className="w-[32px] h-[32px] mr-[4px] border border-solid border-[rgba(0, 0, 0, 0.34)] rounded-full"
                  alt=""
                />
                <span className="font-medium">
                  {firstName} {lastName}
                </span>
              </div>
            );
          },
        },
        {
          header: 'Birthday',
          cell: ({row}: { row: Row<User> }) => {
            const {birthDate, age} = row.original;

            return (
              <>
                {moment(birthDate).format('DD.MM.YYYY')} ({age} years old)
              </>
            );
          },
        },
        {
          header: 'Gender',
          cell: ({row}: { row: Row<User> }) => {
            const {gender} = row.original;

            return (
              <>
                {gender === 'male' ? (
                  <div className="flex flex-row items-center">
                    <IconMale /> Male
                  </div>
                ) : (
                  <div className="flex flex-row items-center">
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
          cell: ({row}: { row: Row<User> }) => {
            const {bloodGroup, height, weight, hair} = row.original;

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

  const renderUsersTableContent = () => {
    if (isLoading) {
      return <NotFound icon={<IconLoading />}
                       title="Loading Page" />;
    }

    if (error)
      return (
        <NotFound icon={<IconError />}
                  title="Opps, something went wrong" />
      );

    if (!data || data.users.length === 0) {
      return <NotFound icon={<IconQuestion />}
                       title="Not Found" />;
    }

    const handleRowClick = (user: User) => {
      navigate(`/user/${user.id}`);
    }

    return (
      <table className="min-w-full table-auto border-collapse border-none">
        <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className="sticky top-0 first:z-10 first:left-0 p-[7px] bg-[#F7F7F8] border border-solid border-[#EAEDF0] leading-[12px] tracking-[0.2px] uppercase text-left font-semibold text-[10px] text-[#5F6E7C] border-t-0 first:border-l-0 last:border-r-0"
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
          <tr key={row.original.id}
              className="bg-[#FFFFFF] hover:bg-[#f7faf9] cursor-pointer"
              onClick={() => handleRowClick(row.original)}>
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                className="first:min-w-[180px] first:sticky first:left-0 py-[12px] px-[8px] border border-solid border-[#EAEDF0] text-left font-normal text-[13px] text-[#202932] whitespace-nowrap first:border-l-0 last:border-r-0"
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
    <div className="h-[550px] overflow-x-auto relative border border-solid border-[#EAEDF0] rounded-tl-[12px] rounded-tr-[12px] bg-[#f7faf9]">
      {renderUsersTableContent()}
    </div>
  );
}

export default UsersTable;
