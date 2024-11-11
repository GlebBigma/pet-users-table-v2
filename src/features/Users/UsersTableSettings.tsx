import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { CustomColumnDef } from './UsersTable';
import { User } from '../../services/types';
import SearchField from '../../components/UIComponents/SearchField/SearchField';
import IconGear from '../../components/Icons/IconGear';

interface UsersTableSettingsProps {
  columns: CustomColumnDef<User>[];
}

const UsersTableSettings: React.FC<UsersTableSettingsProps> = ({ columns }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className='p-[1px] pr-[4px] pl-[5px] absolute top-[-1px] right-[-1px] border border-solid border-[#EAEDF0]'
          aria-label='Customise options'
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
          <SearchField />

          {columns.map((column) => (
            <DropdownMenu.Item
              key={column.header}
              className={`py-[10px] group relative flex h-[30px] select-none items-center rounded-[3px] pl-[8px] pr-[5px] text-[11px] leading-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 ${
                ['Full Name', 'Username', 'Email'].includes(column.header)
                  ? 'text-[#5F6E7C]'
                  : ''
              }`}
            >
              {column.header}
              <div className='ml-auto pl-5 text-mauve11 group-data-[disabled]:text-mauve8 group-data-[highlighted]:text-white'>
                +
              </div>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default UsersTableSettings;
