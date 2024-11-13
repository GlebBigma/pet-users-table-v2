import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import IconGear from '../../components/Icons/IconGear';
import IconCheck from '../../components/Icons/IconCheck';

interface UsersTableSettingsProps {
  columns: string[];
  visibleColumns: { [key: string]: boolean };
  onToggleColumn: (columnName: string) => void;
}

const UsersTableSettings: React.FC<UsersTableSettingsProps> = ({
  columns,
  visibleColumns,
  onToggleColumn,
}) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className='p-[1px] pr-[4px] pl-[5px] absolute top-[0px] right-[0px] z-10 border border-solid border-[#EAEDF0] rounded-tr-[12px] outline-none'
          aria-label='Customize options'
        >
          <div className='h-[24px] w-[24px] flex items-center justify-center bg-[#DEDEDE] rounded-full'>
            <IconGear width='16' />
          </div>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className='w-[228px] mr-[6px] p-[7px] border border-solid border-[#EAEDF0] min-w-[200px] rounded-[13px] bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade'
          sideOffset={5}
          align='end'
        >
          {columns.map((column) => (
            <DropdownMenu.Item
              key={column}
              className={`flex items-center cursor-pointer hover:bg-[#F4F8FC] text-[#202932] p-[8px] text-[14px] leading-[14px] ${
                ['Full Name', 'Username', 'Email'].includes(column)
                  ? 'outline-none hover:bg-transparent hover:cursor-auto'
                  : ''
              }`}
              onSelect={() => onToggleColumn(column)}
            >
              <input
                type='checkbox'
                checked={visibleColumns[column]}
                onChange={() => onToggleColumn(column)}
                disabled={['Full Name', 'Username', 'Email'].includes(column)}
                className='mr-2'
                style={{ visibility: 'hidden' }}
              />
              <span
                className={`flex-grow ${
                  ['Full Name', 'Username', 'Email'].includes(column)
                    ? 'text-gray-500'
                    : ''
                }`}
              >
                {column}
              </span>
              {visibleColumns[column] && <IconCheck />}{' '}
              {/* Показує іконку, якщо колонка видима */}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default UsersTableSettings;
