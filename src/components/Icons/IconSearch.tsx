interface IconSearchProps {
  className?: string;
}

const IconSearch: React.FC<IconSearchProps> = ({ className }) => (
  <svg
    className={className}
    width='20'
    height='20'
    viewBox='0 0 20 20'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M12 8.5C12 10.433 10.433 12 8.5 12C6.567 12 5 10.433 5 8.5C5 6.567 6.567 5 8.5 5C10.433 5 12 6.567 12 8.5ZM12.0195 12.7266C11.0658 13.5217 9.83875 14 8.5 14C5.46243 14 3 11.5376 3 8.5C3 5.46243 5.46243 3 8.5 3C11.5376 3 14 5.46243 14 8.5C14 9.83875 13.5217 11.0658 12.7266 12.0195L13.1213 12.4142H13.8284L18.4142 17L17 18.4142L12.4142 13.8284V13.1213L12.0195 12.7266Z'
      fill='#687684'
    />
  </svg>
);
export default IconSearch;
