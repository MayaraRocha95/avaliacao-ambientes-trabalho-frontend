import React from 'react';

const Header: React.FC = () => {
  return (
    <header style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f5f5f5' }}>
      <img src="logo.png" alt="Logo" style={{ height: '100px' }} />
    </header>
  );
};

export default Header;
