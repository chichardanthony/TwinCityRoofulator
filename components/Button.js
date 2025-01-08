import React from 'react';
import './theme.css'; // Import the theme CSS

const Button = ({ children, onClick }) => (
  <button 
    onClick={onClick} 
    className="bg-primary text-white font-bold py-2 px-4 rounded hover:bg-accent transition duration-300"
  >
    {children}
  </button>
);

export default Button;
