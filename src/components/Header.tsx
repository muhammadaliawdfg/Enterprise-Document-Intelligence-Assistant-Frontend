import React from 'react';
import { User } from 'lucide-react';

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = 'EDIA' }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 py-4 px-6 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button className="p-1 rounded-full hover:bg-gray-100 transition-colors">
            <User className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;