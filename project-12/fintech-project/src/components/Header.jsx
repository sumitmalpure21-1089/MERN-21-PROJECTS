import React from "react";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <header className="card header">
      <h1> 💰 LedgerFlow - Society Finance Manager </h1>
      <div style={{ marginLeft: "auto" }}>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
