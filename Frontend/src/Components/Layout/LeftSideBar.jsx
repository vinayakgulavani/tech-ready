import React, { useState, useEffect } from "react";
import "../../Styles/LeftSideBar.css";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { FaUser, FaCode, FaUserShield } from "react-icons/fa";
import axios from "axios";

const LeftSideBar = () => {
  const [auth] = useAuth();
  const location = useLocation();
  const [languages, setLanguages] = useState([]);
  const [notes, setNotes] = useState([]);
  const [mocktest, setMockTest] = useState([]);
  const [technology, setTechnology] = useState([]);

  // Get all Languages
  const getAllLanguages = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.SNOWPACK_PUBLIC_API}/language/get-language`);
      if (data?.success) {
        setLanguages(data?.language);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong in getting languages");
    }
  };

  useEffect(() => {
    getAllLanguages();
  }, []);

  // Get all Languages notes
  const getAllNotes = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.SNOWPACK_PUBLIC_API}/language-notes/get-languageNotes`);
      if (data?.success) {
        setNotes(data?.notes);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong in getting languages");
    }
  };

  useEffect(() => {
    getAllNotes();
  }, []);

  // Get all Languages notes
  const getAllLanguageMocktest = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.SNOWPACK_PUBLIC_API}/language-mocktest/get-mocktest`);
      if (data?.success) {
        setMockTest(data?.questions);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong in getting languages");
    }
  };

  useEffect(() => {
    getAllLanguageMocktest();
  }, []);

  // Get all technology
  const getAllTechnology = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.SNOWPACK_PUBLIC_API}/technology/get-technology`);
      setTechnology(data?.technology);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong in getting technology");
    }
  };

  useEffect(() => {
    getAllTechnology();
  }, []);

  // To check which language or technology is currently active
  const getActiveClass = (path) => (location.pathname.includes(path) ? "active-link" : "");

  return (
    <div className="sidebar-container">
      <nav className="navigation">
        {/* Personal Info */}
        <div>
          {auth?.user?.role === 1 ? (
            <div>
              <div className="nav-option">
                <NavLink className="nav-link admin-dashboard" to={`/dashboard/admin`}>
                  <FaUserShield className="icon" /> Admin Dashboard
                </NavLink>
              </div>
            </div>
          ) : (
            ""

          )}
        </div>

        <div>
          <h5 id="sidebarLanguageTitle">Language Tutorial</h5>
          <div className="container mt-3 sidebar-containers">
            <div className="accordion" id="sidebarAccordion">
              {languages?.map((l, index) => (
                <div className="accordion-item  sidebar-item " key={index}>
                  <h2 className="accordion-header sidebar-option " id={`heading${l._id}`}>
                    <button
                      className={`accordion-button collapsed ${getActiveClass(l._id)}  sidebar-option fw-bold`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse${l._id}`}
                      aria-expanded="false"
                      aria-controls={`collapse${l._id}`}
                    >
                      <FaCode className="me-2" /> {l.languageName}
                    </button>
                  </h2>
                  <div
                    id={`collapse${l._id}`}
                    className={`accordion-collapse collapse ${getActiveClass(l._id)} sidebar-body`}
                    aria-labelledby={`heading${l._id}`}
                    data-bs-parent="#sidebarAccordion"
                  >
                    {notes?.filter((note) => note.languageName === l._id).length > 0 && (
                      <div className="sidebar-sub-option">
                        <h5 className=" mt-1 text-left ps-3 ">Notes :</h5>
                        <hr />
                      </div>)}
                    <div className="accordion-body">
                      {notes
                        ?.filter((note) => note.languageName === l._id)
                        .map((note, noteIndex) => (
                          <NavLink key={noteIndex} to={`/notes/${l._id}/${note._id}`} className="nav-link text-dark notes-mocktest">
                            {note.notestitle}
                          </NavLink>
                        ))}
                    </div>

                    {mocktest?.filter((mt) => mt.languageName === l._id).length > 0 && (
                      <div className="sidebar-sub-option">
                        <h5 className="fw-semibold ps-3 ">Mock Test :</h5>
                        <hr />
                      </div>
                    )}
                    <div className="accordion-body">
                      {mocktest
                        ?.filter((mt) => mt.languageName === l._id)
                        .map((mt, mtIndex) => (
                          <NavLink key={mtIndex} to={`/lang-mocktest/${l._id}/${mt._id}`} className="nav-link text-dark notes-mocktest">
                            {mt.testName}
                          </NavLink>
                        ))}
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Technology Tutorial
        <hr />
        <div>
          <h5>Technology Tutorial</h5>
          <div className="container mt-3">
            <div className="accordion" id="technologyAccordion">
              {technology?.map((tech, index) => (
                <div className="accordion-item" key={index}>
                  <h2 className="accordion-header" id={`heading${tech.technologyName}`}>
                    <button
                      className={`accordion-button collapsed ${getActiveClass(tech.technologyName)}`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse${tech.technologyName}`}
                      aria-expanded="false"
                      aria-controls={`collapse${tech.technologyName}`}
                    >
                      {tech.icon} {tech.technologyName}
                    </button>
                  </h2>

                  <div
                    id={`collapse${tech.technologyName}`}
                    className={`accordion-collapse collapse ${getActiveClass(tech.technologyName)}`}
                    aria-labelledby={`heading${tech.technologyName}`}
                    data-bs-parent="#technologyAccordion"
                  >
                    <div className="accordion-body">
                      {tech.subPoints?.map((subPoint, noteIndex) => (
                        <NavLink key={noteIndex} to={`/notes/${tech.path}/${subPoint.path}`} className="nav-link">
                          {subPoint.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div> */}
      </nav>
    </div>
  );
};

export default LeftSideBar;
