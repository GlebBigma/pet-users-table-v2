import React from 'react';
import * as Select from '@radix-ui/react-select';

type SelectItemProps = React.ComponentProps<typeof Select.Item>;

const SelectItemsPerPageItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className="relative flex h-[25px] items-center rounded-[3px] pl-[25px] text-[13px] hover:text-[#005db7] hover:border-0"
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
      </Select.Item>
    );
  }
);

SelectItemsPerPageItem.displayName = 'SelectItemsPerPageItem';

export default SelectItemsPerPageItem;
