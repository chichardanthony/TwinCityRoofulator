import React from 'react';
import { Home, User } from 'lucide-react';

const Navbar = () => (
  <nav className="flex items-center justify-between p-6 bg-secondary text-white">
    <div className="flex items-center space-x-4">
      <Home className="w-6 h-6" />
      <span className="text-lg font-bold">Roofulator</span>
    </div>
    <div>
      <User className="w-6 h-6" />
    </div>
  </nav>
);

export default Navbar;
