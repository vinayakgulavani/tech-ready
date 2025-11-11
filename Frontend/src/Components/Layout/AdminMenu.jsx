import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../Styles/AdminMenu.css';

const AdminMenu = () => {
  return (
    <div id="dashboard-menu" className="list-group shadow-lg rounded p-4 col-10 m-auto">
      <h3 id="admin-title" className="py-2 rounded">Admin Panel</h3>
      <div className="list-group">
        <div className="accordion-body">
          <NavLink
            to="/dashboard/admin/users"
            className="list-group-item list-group-item-action admin-link my-2 py-2"
          >
            Users
          </NavLink>
        </div>

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
                {/* <NavLink to="/dashboard/admin/notes" className="dropdown-item">All Notes</NavLink>
                <NavLink to="/dashboard/admin/add-notes" className="dropdown-item">Add Notes</NavLink> */}
              </div>
            </div>
          </div>
        </div>


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
                {/* <NavLink to="/dashboard/admin/mocktest" className="dropdown-item">Course Mock Test</NavLink> */}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminMenu;
