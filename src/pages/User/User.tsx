import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetUserQuery } from '../../app/services/users';
import NotFound from '../../components/UIComponents/EmptyState/EmptyState.tsx';
import IconLoading from '../../components/Icons/IconLoading.tsx';
import IconError from '../../components/Icons/IconError.tsx';

const UserDetail: React.FC = () => {
  const { userId } = useParams<{ userId: string }>(); // Отримуємо ID з URL
  const { data, error, isLoading } = useGetUserQuery(Number(userId)); // Отримуємо дані користувача по ID

  if (isLoading) {
    return <NotFound icon={<IconLoading />} title="Loading..." />;
  }

  if (error) {
    return <NotFound icon={<IconError />} title="Opps, something went wrong" />;
  }

  if (!data) {
    return <NotFound icon={<IconError />} title="User not found" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center mb-6">
          <img
            src={data.image}
            alt={`${data.firstName} ${data.lastName}`}
            className="w-24 h-24 rounded-full object-cover mr-6"
          />
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">{data.firstName} {data.lastName}</h1>
            <p className="text-lg text-gray-600">{data.username}</p>
            <p className="text-md text-gray-500">{data.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Personal Information</h2>
            <div className="space-y-3">
              <p><span className="font-medium">Age:</span> {data.age}</p>
              <p><span className="font-medium">Gender:</span> {data.gender}</p>
              <p><span className="font-medium">Blood Group:</span> {data.bloodGroup}</p>
              <p><span className="font-medium">Height:</span> {data.height} cm</p>
              <p><span className="font-medium">Weight:</span> {data.weight} kg</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Contact Information</h2>
            <div className="space-y-3">
              <p><span className="font-medium">Email:</span> {data.email}</p>
              <p><span className="font-medium">Phone:</span> {data.phone}</p>
              <p><span className="font-medium">IP Address:</span> {data.ip}</p>
              <p><span className="font-medium">Mac Address:</span> {data.macAddress}</p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">User Agent</h2>
          <p className="text-gray-600">{data.userAgent}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
