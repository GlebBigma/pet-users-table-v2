import { useState } from 'react';

interface PaginationProps {
  itemsPerPage: number;
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pafination: React.FC<PaginationProps> = ({
  itemsPerPage,
  setItemsPerPage,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = 9999;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
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
        {`${(currentPage - 1) * itemsPerPage + 1} - ${
          currentPage * itemsPerPage > totalItems
            ? totalItems
            : currentPage * itemsPerPage
        } OF ${totalItems.toLocaleString()}`}
      </div>

      <div className='flex items-center space-x-2'>
        <button
          className={`p-1 ${
            currentPage === 1 ? 'text-gray-400' : 'text-blue-500'
          }`}
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          <span className='material-icons'>chevron_left</span>
        </button>

        <input
          type='text'
          className='w-10 text-center border rounded-md text-sm'
          value={currentPage}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (value >= 1 && value <= totalPages) setCurrentPage(value);
          }}
        />

        <button
          className={`p-1 ${
            currentPage === totalPages ? 'text-gray-400' : 'text-blue-500'
          }`}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <span className='material-icons'>chevron_right</span>
        </button>
      </div>
    </div>
  );
};

export default Pafination;
