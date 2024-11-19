import React, { useState, ChangeEvent } from 'react';
import { useGetUsersQuery, } from '../../app/services/users';
import { ColumnDef } from '@tanstack/react-table';
import useDebounce from '../../hooks/useDebounce.ts';
import SearchField from '../../components/UIComponents/SearchField/SearchField';
import UsersTableSettings from './UsersTableSettings';
import Pagination from '../../components/UIComponents/Pagintaion/Pagination';
import UsersTable from './UsersTable.tsx';

export type CustomColumnDef<TData> = ColumnDef<TData> & {
  header: string;
};

const Users: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
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
  const {data, error, isLoading} = useGetUsersQuery({
    searchTerm: debouncedSearchTerm,
    limit: itemsPerPage,
    page: currentPage,
  });

  const toggleColumnVisibility = (columnName: string) => {
    if (['Full Name', 'Username', 'Email'].includes(columnName)) return;
    setVisibleColumns((prev) => ({
      ...prev,
      [columnName]: !prev[columnName],
    }));
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <SearchField value={searchTerm}
                   onChange={handleSearchChange} />

      <div className="relative">
        <UsersTableSettings
          columns={Object.keys(visibleColumns)}
          visibleColumns={visibleColumns}
          onToggleColumn={toggleColumnVisibility}
        />
        <UsersTable data={data}
                    error={error}
                    isLoading={isLoading}
                    visibleColumns={visibleColumns} />
        <Pagination
          totalItems={data?.total}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default Users;
