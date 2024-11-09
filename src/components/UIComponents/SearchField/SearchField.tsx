import IconSearch from '../../Icons/IconSearch';

interface SearchFieldProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchField: React.FC<SearchFieldProps> = ({ value, onChange }) => {
  return (
    <div className='relative'>
      <IconSearch className='absolute top-[8px] left-[8px]' />
      <input
        type='text'
        value={value}
        onChange={onChange}
        placeholder='Search...'
        className='w-full mb-[12px] py-[6px] pl-[35px] pr-[10px] bg-[#f7faf9] border rounded-[8px] border-[rgba(234, 237, 240, 1)] leading-[20px] placeholder:font-normal placeholder:text-[13px] placeholder:text-[#5F6E7C] active:border-[rgba(0, 92, 178, 1)] focus:text-[rgba(32, 41, 50, 1)]'
      />
    </div>
  );
};

export default SearchField;
