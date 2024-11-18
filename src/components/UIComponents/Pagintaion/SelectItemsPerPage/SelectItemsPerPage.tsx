import React, {ReactNode} from 'react';
import * as Select from '@radix-ui/react-select';
import IconArrowDown from '../../../Icons/IconArrowDown.tsx';

interface SelectFieldProps {
  name: string;
  value: number;
  onValueChange: (value: number) => void;
  children: ReactNode;
}

const SelectItemsPerPage: React.FC<SelectFieldProps> = ({name, value, onValueChange, children}) => {
  return (
    <div className="flex items-center">
      <Select.Root value={String(value)}
                   onValueChange={(value) => onValueChange(Number(value))}
      >
        <Select.Trigger
          className="inline-flex w-[88px] h-[36px] pt-[10px] pr-[7px] pb-[10px] pl-[11px] items-center justify-between bg-[#f7faf9] border-[1px] rounded-[8px] border-[rgba(0, 0, 0, 0.34)] text-[13px] text-[#5F6E7C]"
          aria-label={name}
        >
          <Select.Value />
          <Select.Icon>
            <IconArrowDown />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content className="overflow-hidden bg-white border-[1px] rounded-[8px] border-[rgba(0, 0, 0, 0.34)] font-semibold text-[13px] text-[#212931] hover:cursor-pointer">
            <Select.Viewport className="p-[4px]">
              {children}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
      <span className="ml-[12px] font-semibold uppercase text-[10px] tracking-[0.2px] text-[#5F6E7C]">items per page</span>
    </div>
  )
};

export default SelectItemsPerPage;