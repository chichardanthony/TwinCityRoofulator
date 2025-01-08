import React from 'react';
import '../theme.css'; // Import the theme CSS

const Card = ({ children }) => (
  <div className="bg-light rounded-lg shadow p-6 hover:shadow-lg transition-shadow duration-300">
    {children}
  </div>
);

export default Card;
