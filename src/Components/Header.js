import React from "react";

function Header({ setIsAdding, searchQuery, setSearchQuery }) {
  return (
    <header className="header">
      <h1>Employee Management</h1>
      <div className="header-actions">
        <button onClick={() => setIsAdding(true)} className="button">
          Add Employee
        </button>
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Search by Name or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-bar"
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
