import { Outlet } from 'react-router-dom';

const Root = () => {
  return (
    <div className='py-[30px] px-[54px]'>
      ROOT COMPONENT
      <Outlet />
    </div>
  );
}

export default Root;
