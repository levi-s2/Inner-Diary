import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

function Layout({ children }) {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="content">
        <Header />
        {children}
      </div>
    </div>
  );
}

export default Layout;
