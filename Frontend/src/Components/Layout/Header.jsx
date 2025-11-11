import React, { useState, useEffect } from "react";
import "../../Styles/Header.css";
import LeftSideBar from "./LeftSideBar";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";
import UserMenu from "./UserMenu";
import { FaUser, FaSignOutAlt, FaHome, FaInfoCircle, FaEnvelope,FaSignInAlt, FaUserPlus,FaUserShield  } from 'react-icons/fa';

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [courses, setCourses] = useState([]);

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };


  // Get all courses
  const getAllCourses = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.SNOWPACK_PUBLIC_API}/course/get-courses`);
      if (data?.success && Array.isArray(data?.courses)) {
        setCourses(data.courses);
      } else {
        setCourses([]);
        toast.error("No courses found.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong in getting courses");
    }
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-white shadow-sm fixed-top px-3">
        <div className="container-fluid">
          {/* Left Sidebar Toggle */}
          <button
            className="btn d-lg-none"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasLeft"
            aria-controls="offcanvasLeft"
          >
            <span className="navbar-toggler-icon" />
          </button>

          {/* Logo */}
          <NavLink to="/" className="nav-link active text-primary">
            <img src="/images/logo.png" alt="TechReady" className="navbar-brand" style={{ width: "150px" }} to="/"/>
          </NavLink>


          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
            <span className="navbar-toggler-icon" />
          </button>

          {/* Navbar Items */}
          <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
            <ul className="navbar-nav">
              <li className="nav-item"><Link className="nav-link" to="/"><FaHome   className="icon" />Home</Link></li>
              {!auth?.user ? (
                <>
                  <li className="nav-item"><Link className="nav-link" to="/about"><FaInfoCircle  className="icon" />About</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/contact"><FaEnvelope   className="icon" />Contact</Link></li>

                  <li className="nav-item"><Link to="/register" className="nav-link"> <FaUserPlus   className="icon" />Register</Link></li>
                  <li className="nav-item"><Link to="/login" className="btn btn-login text-white"><FaSignInAlt   className="icon" /> Login </Link></li>
                </>
              ) : (auth?.user?.role === 1 ? (
                <>
                  {/* Admin Navbar */}
                  <li className="nav-item"><Link className="nav-link" to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"
                    }`}><FaUserShield className="icon" /> Admin Dashboard</Link></li>
                  <li className="nav-item"><Link onClick={handleLogout} to="/login" className="nav-link">
                                  <FaSignOutAlt className="icon" /> Logout
                  </Link></li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/about">
                    <FaInfoCircle  className="icon" />About
                  </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/contact">
                    <FaEnvelope   className="icon" /> Contact
                    </Link>
                    </li>

                  {/* Courses Dropdown */}
                  {/* <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Courses</a>
                    <ul className="dropdown-menu">
                      <li><Link className="dropdown-item" to="#">Web Development</Link></li>
                      <li><Link className="dropdown-item" to="#">AI & ML</Link></li>
                      <li><Link className="dropdown-item" to="#">Data Science</Link></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><Link className="dropdown-item" to="#">Java Developer</Link></li>
                      <li><Link className="dropdown-item" to="#">Python Developer</Link></li>
                    </ul>
                  </li> */}
                  {/* User Navbar */}


                  <li className="nav-item">
                    <Link className="nav-link"

                      type="button"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#userSidebarSmall"
                      aria-controls="userSidebarSmall"
                    >
                      <FaUser className="icon" />{auth?.user?.name}
                    </Link>
                  </li>


                  {/* <li className="nav-item">
                    <Link onClick={handleLogout} to={"/login"} className="nav-link">
                     <FaSignOutAlt className="icon" />  Logout
                    </Link>
                  </li> */}
                </>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div className="offcanvas-lg offcanvas-start d-lg-block sidebar-lg bg-light shadow-sm" data-bs-scroll="true" tabIndex="-1" id="offcanvasLeft" aria-labelledby="offcanvasLeftLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasLeftLabel">Menu</h5>
        </div>
        <div className="offcanvas-body">
          <LeftSideBar />
        </div>
      </div>


      <div
        className="offcanvas offcanvas-end  bg-light shadow-sm"
        data-bs-scroll="true"
        tabIndex="-1"
        id="userSidebarSmall"
        aria-labelledby="userSidebarSmallLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="userSidebarSmallLabel">User Menu </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>


        <div className="offcanvas-body">
          <UserMenu />
        </div>
      </div>
    </>
  );
};

export default Header;
