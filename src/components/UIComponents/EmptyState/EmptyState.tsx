interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ icon, title }) => {
  return (
    <div className='h-full flex flex-col justify-center items-center'>
      {icon}
      <span className='mt-[16px] font-semibold text-[20px] text-[rgba(32, 41, 50, 1)]'>
        {title}
      </span>
    </div>
  );
};

export default EmptyState;
