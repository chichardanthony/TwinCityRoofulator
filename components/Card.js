import React from 'react';

const Card = ({ children }) => (
  <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow duration-300">
    {children}
  </div>
);

export default Card;
