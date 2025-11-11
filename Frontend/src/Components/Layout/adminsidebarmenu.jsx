import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../Styles/AdminMenu.css';

const AdminMenu = () => {
  return (
    <div id="dashboard-menu" className="list-group shadow-lg rounded p-4 col-10 m-auto">
      {/* Toggle Button for Small Screens */}
      <button
        className="btn btn-primary d-lg-none mb-2"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#adminSidebarSmall"
        aria-controls="adminSidebarSmall"
        style={{ fontSize: "1.2rem", padding: "8px 16px", borderRadius: "8px" }}
      >
       Admin Panel ☰ 
      </button>

      {/* Toggle Button for Large Screens */}
      <button
        className="btn btn-primary d-none d-lg-inline-block mb-2"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#adminSidebarLarge"
        aria-controls="adminSidebarLarge"
        style={{ fontSize: "1.2rem", padding: "8px 16px", borderRadius: "8px" }}
      >
        Admin Panel  ☰
      </button>

      {/* Offcanvas Sidebar for Small Screens */}
      <div
        className="offcanvas offcanvas-end d-lg-none bg-light shadow-sm"
        data-bs-scroll="true"
        tabIndex="-1"
        id="adminSidebarSmall"
        aria-labelledby="adminSidebarSmallLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="adminSidebarSmallLabel">Menu (Small)</h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          {/* Small Screen Sidebar Content */}
          <SidebarContent />
        </div>
      </div>

      {/* Offcanvas Sidebar for Large Screens */}
      <div
        className="offcanvas offcanvas-end d-none d-lg-block bg-light shadow-sm"
        data-bs-scroll="true"
        tabIndex="-1"
        id="adminSidebarLarge"
        aria-labelledby="adminSidebarLargeLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="adminSidebarLargeLabel">Menu (Large)</h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          {/* Large Screen Sidebar Content */}
          <SidebarContent />
        </div>
      </div>
    </div>
  );
};

// Reusable Sidebar Content Component
const SidebarContent = () => (
  <>
    {/* Users Section */}
    <div className="accordion-body">
      <NavLink
        to="/dashboard/admin/users"
        className="list-group-item list-group-item-action admin-link my-2 py-2"
      >
        Users
      </NavLink>
    </div>

    {/* Language Section */}
    <div className="accordion my-2" id="languageAccordion">
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingLanguage">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseLanguage"
            aria-expanded="false"
            aria-controls="collapseLanguage"
          >
            Language Section
          </button>
        </h2>
        <div
          id="collapseLanguage"
          className="accordion-collapse collapse"
          aria-labelledby="headingLanguage"
          data-bs-parent="#languageAccordion"
        >
          <div className="accordion-body">
            <NavLink to="/dashboard/admin/language" className="dropdown-item">All Language</NavLink>
            <NavLink to="/dashboard/admin/add-language" className="dropdown-item">Add Language</NavLink>
          </div>
        </div>
      </div>
    </div>

    {/* Technology Section */}
    <div className="accordion my-2" id="TechnologyAccordion">
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingTechnology">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTechnology"
            aria-expanded="false"
            aria-controls="collapseTechnology"
          >
            Technology Section
          </button>
        </h2>
        <div
          id="collapseTechnology"
          className="accordion-collapse collapse"
          aria-labelledby="headingTechnology"
          data-bs-parent="#TechnologyAccordion"
        >
          <div className="accordion-body">
            <NavLink to="/dashboard/admin/technology" className="dropdown-item">All Technology</NavLink>
            <NavLink to="/dashboard/admin/add-technology" className="dropdown-item">Add Technology</NavLink>
          </div>
        </div>
      </div>
    </div>

    {/* Course Section */}
    <div className="accordion my-2" id="courseAccordion">
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingCourse">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseCourse"
            aria-expanded="false"
            aria-controls="collapseCourse"
          >
            Course Section
          </button>
        </h2>
        <div
          id="collapseCourse"
          className="accordion-collapse collapse"
          aria-labelledby="headingCourse"
          data-bs-parent="#courseAccordion"
        >
          <div className="accordion-body">
            <NavLink to="/dashboard/admin/courses" className="dropdown-item">All Course</NavLink>
            <NavLink to="/dashboard/admin/add-course" className="dropdown-item">Add Course</NavLink>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default AdminMenu;
