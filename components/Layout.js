import React from 'react';
import Card from './Card';

const Layout = () => (
  <div className="container mx-auto p-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card>
        <h2 className="text-xl font-bold mb-2">Card 1</h2>
        <p>This is the content of card 1.</p>
      </Card>
      <Card>
        <h2 className="text-xl font-bold mb-2">Card 2</h2>
        <p>This is the content of card 2.</p>
      </Card>
      <Card>
        <h2 className="text-xl font-bold mb-2">Card 3</h2>
        <p>This is the content of card 3.</p>
      </Card>
    </div>
  </div>
);

export default Layout;
