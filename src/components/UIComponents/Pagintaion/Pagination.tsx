import { useState } from 'react';

interface PaginationProps {
  totalItems?: number;
  itemsPerPage: number;
  setItemsPerPage: (value: number) => void;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems = 0,
  itemsPerPage,
  setItemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const [inputPage, setInputPage] = useState<string>(currentPage.toString());
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const isValidPage = (page: number) => page >= 1 && page <= totalPages;

  const handlePageChange = (page: number) => {
    if (isValidPage(page)) {
      onPageChange(page);
      setInputPage(page.toString());
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) setInputPage(value);
  };

  const handlePageSubmit = () => {
    const pageNumber = Number(inputPage);
    if (isValidPage(pageNumber)) {
      handlePageChange(pageNumber);
    } else {
      setInputPage(currentPage.toString());
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') handlePageSubmit();
  };

  const getButtonClass = (isDisabled: boolean) =>
    isDisabled ? 'text-gray-400' : 'text-blue-500';

  return (
    <div className='flex items-center justify-between p-4 border-t border-gray-200'>
      <div className='flex items-center space-x-2'>
        <select
          className='px-3 py-1.5 border rounded-md text-sm bg-white shadow-sm'
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
        <span className='text-sm text-gray-600'>ITEMS PER PAGE</span>
      </div>

      <div className='text-sm text-gray-600'>
        {`${(currentPage - 1) * itemsPerPage + 1} - ${Math.min(
          currentPage * itemsPerPage,
          totalItems
        )} OF ${totalItems}`}
      </div>

      <div className='flex items-center space-x-2'>
        <button
          className={`p-1 ${getButtonClass(currentPage === 1)}`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <span className='material-icons'>chevron_left</span>
        </button>

        <input
          type='text'
          value={inputPage}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          className='w-12 text-center border border-gray-300 rounded'
        />

        <button
          className={`p-1 ${getButtonClass(currentPage === totalPages)}`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <span className='material-icons'>chevron_right</span>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
