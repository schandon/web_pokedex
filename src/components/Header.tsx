import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import mini_logo from '../assets/mini_logo.svg';
import logo_dsr from '../assets/logo_dsr.svg';

export function Header() {
  return (
    <header className="fixed top-0  mt-6">
      <div className="max-w-[960px] w-full mx-auto  text-white p-10 z-10 fixed top-0 left-0 right-0">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img
              className="w-[180px] "
              src={logo_dsr}
              alt=""
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex text-sm">
              <img
                className="w-[45px] p-2"
                src={mini_logo}
                alt=""
              />
              <div className="pr-4">
                <p className="text-gray-700">Welcome,</p>
                <p className="font-medium text-gray-900">{userEmail}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="cursor-pointer inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md
              text-gray-700 bg-gray-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
