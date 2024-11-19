import React from 'react';
import { useNavigate, useRouteError, isRouteErrorResponse } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const errorStatus = isRouteErrorResponse(error) ? error.status : 500;
  const errorMessage = isRouteErrorResponse(error)
    ? error.statusText || 'An unexpected error occurred'
    : 'An unexpected error occurred';

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">{errorStatus}</h1>
        <p className="mt-4 text-lg text-gray-700">{errorMessage}</p>
        <button
          onClick={handleGoHome}
          className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
