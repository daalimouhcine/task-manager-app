import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { LogOut, User, Mail } from "lucide-react";

const Tasks = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <header className='bg-white shadow-sm border-b border-gray-200'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center py-4'>
            <div>
              <h1 className='text-2xl font-bold text-gray-900'>Task Manager</h1>
            </div>

            <div className='flex items-center space-x-4'>
              <div className='flex items-center space-x-3 bg-gray-50 rounded-lg px-3 py-2'>
                <div className='flex-shrink-0'>
                  <div className='w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center'>
                    <User className='w-4 h-4 text-white' />
                  </div>
                </div>
                <div className='hidden sm:block'>
                  <div className='flex items-center space-x-1'>
                    <span className='text-sm font-medium text-gray-900'>
                      {user?.username}
                    </span>
                  </div>
                  <div className='flex items-center space-x-1'>
                    <Mail className='w-3 h-3 text-gray-400' />
                    <span className='text-xs text-gray-500'>{user?.email}</span>
                  </div>
                </div>
              </div>

              {/* Logout button */}
              <button
                onClick={handleLogout}
                className='inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200'>
                <LogOut className='w-4 h-4 mr-2' />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Tasks;
