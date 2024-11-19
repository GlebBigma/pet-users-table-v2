import React, {useState} from 'react';
import * as Select from '@radix-ui/react-select';
import SelectItemsPerPageItem from './SelectItemsPerPage/SelectItemsPerPageItem.tsx';
import SelectItemsPerPage from './SelectItemsPerPage/SelectItemsPerPage.tsx';
import IconArrowLeft from '../../Icons/IconArrowLeft.tsx';
import IconArrowRight from '../../Icons/IconArrowRight.tsx';

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
    isDisabled ? 'opacity-50' : '';

  return (
    <div className="flex items-center justify-between p-[7px] rounded-bl-[12px] rounded-br-[12px] border border-t-0 border-[rgba(234, 237, 240, 1)]">
      <SelectItemsPerPage name="Items per page"
                          value={itemsPerPage}
                          onValueChange={setItemsPerPage}
      >
        <Select.Group>
          <SelectItemsPerPageItem value="10">10</SelectItemsPerPageItem>
          <SelectItemsPerPageItem value="20">20</SelectItemsPerPageItem>
          <SelectItemsPerPageItem value="50">50</SelectItemsPerPageItem>
        </Select.Group>
      </SelectItemsPerPage>

      <div className="flex items-center">
        <div className="mr-[12px]  font-semibold uppercase text-[10px] tracking-[0.2px] text-[#5F6E7C]">
          {`${(currentPage - 1) * itemsPerPage + 1} - ${Math.min(
            currentPage * itemsPerPage,
            totalItems
          )} OF ${totalItems}`}
        </div>
        <div className="flex items-center space-x-2">
          <button
            className={`p-1 ${getButtonClass(currentPage === 1)}`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <IconArrowLeft />
          </button>
          <input
            type="text"
            value={inputPage}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            className="w-[64px] h-[36px] bg-[#f7faf9] border rounded-[8px] border-[rgba(234, 237, 240, 1)] text-center leading-[20px] text-[13px] placeholder:font-normal placeholder:text-[13px] placeholder:text-[#5F6E7C] active:border-[rgba(0, 92, 178, 1)] focus:text-[13px] focus:text-[rgba(32, 41, 50, 1)]"
          />
          <button
            className={`p-1 ${getButtonClass(currentPage === totalPages)}`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <IconArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
