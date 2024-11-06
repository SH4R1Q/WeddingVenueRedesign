import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/reducer/auth';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';

interface Props {
  yourName: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  profile?: string | undefined;
  id?: string | undefined;
}

const UserSidebar: React.FC<Props> = ({ yourName, profile, phone, email }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleTabClick = (tabName: string) => {
    switch (tabName) {
      case 'My venues':
        navigate('/my-venues');
        break;
      case 'My services':
        navigate('/my-services');
        break;
      case 'List a new service':
        navigate('/list-service');
        break;
      case 'Logout':
        dispatch(logout());
        navigate('/');
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex md:h-screen bg-gray-100">
      <div className="bg-blue-900 w-64 sm:w-80 p-6 flex flex-col items-center rounded-lg shadow-lg md:shadow-none md:rounded-none">
        
        {/* Profile Picture */}
        <div className="w-28 h-28 mt-6 mb-4 rounded-full overflow-hidden border-2 border-white shadow-lg">
          <img src={profile} alt="Profile" className="w-full h-full object-cover" />
        </div>

        {/* User Information */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-semibold text-white">{yourName}</h3>
          <p className="text-gray-200">{email}</p>
          <p className="text-gray-200">{phone}</p>
        </div>

        {/* Navigation Links */}
        <nav className="mt-8 w-full flex flex-col space-y-4">
          {['My venues', 'My services', 'List a new service', 'Logout'].map(tab => (
            <button
              key={tab}
              className="text-lg font-medium text-gray-200 w-full py-3 rounded-lg bg-blue-800 hover:bg-blue-700 hover:text-white transition-colors duration-300"
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>

      </div>
    </div>
  );
};

export default UserSidebar;
