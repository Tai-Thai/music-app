import React from 'react';
import { Header, Sidebar } from './components';

function DefaultLayout({ children }) {
  return (
    <div>
      <Header />
      {/* <Sidebar />
      {children} */}
    </div>
  );
}

export default DefaultLayout;
