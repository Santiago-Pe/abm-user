import React from "react";
import "./sidebar.css"; // Import the CSS file for styling

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        {/* Add your sidebar items here */}
        <div className="sidebar-item">
          <i className="pi pi-home"></i>
        </div>
        <div className="sidebar-item">
          <i className="pi pi-user"></i>
        </div>
        <div className="sidebar-item">
          <i className="pi pi-cog"></i>
        </div>
        {/* Add more items as needed */}
      </div>
    </div>
  );
};

export default Sidebar;
