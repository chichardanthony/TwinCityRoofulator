import React from 'react';
import Navbar from '../components/Navbar';
import Layout from '../components/Layout';
import Button from '../components/Button';

const HomePage = () => (
  <div>
    <Navbar />
    <Layout />
    <div className="container mx-auto p-6">
      <Button onClick={() => alert('Button clicked!')}>Calculate</Button>
    </div>
  </div>
);

export default HomePage;
