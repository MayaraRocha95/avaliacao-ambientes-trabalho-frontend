import React from "react";
import "./header.css";

const Header: React.FC = () => {
  return (
    <header
      style={{
        textAlign: "center",
        padding: "20px",
        backgroundColor: "#f5f5f5",
      }}
    >
      {/* <img src="logo.png" alt="Logo" style={{ height: '200px' }} /> */}
      <h1>
        <span className="brackets">&#123;</span>
        <span className="elas">ELAS</span>
        <span className="brackets">&#125;</span>
        <span className="avaliam">Avaliam</span>
      </h1>
    </header>
  );
};

export default Header;
