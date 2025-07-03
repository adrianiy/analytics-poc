import React from "react";
import "./Header.css";

const Header: React.FC = () => {
  return (
    <header className="app-header">
      <div className="header-container">
        <div className="logo">
          <h1>ZARA</h1>
          <span className="subtitle">Analytics</span>
        </div>
        <div className="header-actions">
          <button className="header-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </button>
          <button className="header-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </button>
          <div className="user-profile">
            <div className="profile-avatar">AD</div>
            <span className="profile-name">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
