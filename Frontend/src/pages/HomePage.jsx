import React, { useState, useEffect } from 'react'
import Layout from '../Components/Layout/Layout'
import '../Styles/HomePageStyle.css'
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import IntroLoader from '../Components/IntroLoader';

const HomePage = () => {
  const [auth, setAuth] = useAuth();
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const CourseAccessButton = ({ c, auth }) => {
    const [hasAccess, setHasAccess] = useState(false);
  
    useEffect(() => {
      const checkAccess = async () => {
        try {
          const res = await axios.get(
            `${import.meta.env.SNOWPACK_PUBLIC_API}/purchase/check-access/${c._id}/${auth?.user?._id}`
          );
          setHasAccess(res.data.purchase);
        } catch (err) {
          console.error("Error:", err);
        }
      };
      checkAccess();
    }, [c._id, auth?.user?._id]);
  
    return hasAccess ? (
      <Link to={`/start-course/${c._id}/${auth?.user?.name}`} className="btn btn-success">
        Start Learning
      </Link>
    ) : (
      <Link to={`/access-course/${c._id}/${auth?.user?._id}`} className="btn btn-outline-info">
        <i className="bi bi-plus-circle"></i> Start Learning
      </Link>
    );
  };

  // Get courses
  const getCourses = async () => {

    try {
      const { data } = await axios.get(`${import.meta.env.SNOWPACK_PUBLIC_API}/course/get-courses`);
      setCourses(data.courses);

    }
    catch (error) {
      console.error(error);
      toast.error("Something went wrong in getting the courses");
    }
  };

  useEffect(() => {
    getCourses();
    //eslint-disable-next-line
  }, []);


  return (
    <>
      {showLoader ? (
        <IntroLoader />
      ) : (
        <Layout title={'Home Page'} >
          <div className="homepage">


            {!auth?.user && (
              <div
                className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                style={{ background: "rgba(255, 255, 255, 0.2)", blur: "10px", zIndex: "100000" }}
              >
                <div className="card p-4 text-center shadow-lg" style={{ zIndex: "10000" }}>
                  <h3 className="mb-4 title">Welcome to TechReady</h3>
                  <img src="/images/logo.png" alt="TechReady"
                    className="mb-3 mx-auto d-block"
                    style={{ width: "120px" }} />
                  <p className="text-muted">Please login or register to continue</p>
                  <div className="d-flex flex-column gap-3">
                    <button className="btn btn-primary" onClick={() => navigate("/login")}>
                      Login
                    </button>
                    <button className="btn btn-outline-primary" onClick={() => navigate("/register")}>
                      Register
                    </button>
                  </div>
                </div>
              </div>
            )}



            <div className='IntroHomePage'>
              <h4>Hello, {auth?.user?.name}!</h4>
              <h6>Welcome to TechReady</h6>

              <div className="text-center">
                <div className='heading'>
                  <h1 className='p-auto ms-5 text-center'>
                    <span className="hover-area">T
                      <div className="hover-box"><img src="https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg" alt="HTML" />
                      </div>
                    </span>
                    <span className="hover-area">e
                      <div className="hover-box"><img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg" alt="CSS" />
                      </div>
                    </span>
                    <span className="hover-area">c
                      <div className="hover-box"><img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" alt="JavaScript" /></div>
                    </span>
                    <span className="hover-area">h
                      <div className="hover-box"><img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" alt="Node.js" /></div>
                    </span>
                    <span className="hover-area">R
                      <div className="hover-box"><img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React" /></div>
                    </span>
                    <span className="hover-area">e
                      <div className="hover-box"><img src="https://upload.wikimedia.org/wikipedia/commons/3/3f/Git_icon.svg" alt="Git" /></div>
                    </span>
                    <span className="hover-area">a
                      <div className="hover-box"><img src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg" alt="Python" /></div>
                    </span>
                    <span className="hover-area">d
                      <div className="hover-box"><img src="https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg" alt="MongoDB" /></div>
                    </span>
                    <span className="hover-area">y
                      <div className="hover-box"><img src="https://upload.wikimedia.org/wikipedia/commons/Java_logo.svg" alt="Java" /></div>
                    </span>
                  </h1>
                </div>
              </div>


            </div>
            <hr />

            {/* Cources */}
            <div className="container mt-5">
              <h2
                className="text-center fw-bold text-white rounded-3 shadow-lg p-3"
                style={{
                  background:
                    "linear-gradient(45deg, rgb(84, 190, 219), rgb(103, 150, 153), rgb(147, 203, 229))",
                }}
              >
                Our Courses
              </h2>

              {/* Bootstrap Carousel */}
              <div
                id="courseCarousel"
                className="carousel slide mt-4"
                data-bs-ride="carousel"
              >
                <div className="carousel-indicators">
                  {courses.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      data-bs-target="#courseCarousel"
                      data-bs-slide-to={index}
                      className={`custom-indicator ${index === 0 ? "active" : ""}`}
                      aria-label={`Slide ${index + 1}`}
                    ></button>
                  ))}
                </div>


                <div className="carousel-inner">
                  {courses.map((c, index) => (
                    <div
                      key={index}
                      className={`carousel-item ${index === 0 ? "active" : ""}`}
                    >
                      <div className="d-flex justify-content-center">
                        <div
                          className="card shadow-lg border-0 col-11 col-lg-8 rounded-3 overflow-hidden mb-3 card-deco"
                          style={{
                            background:
                              "linear-gradient(45deg, rgb(84, 190, 219), rgb(150, 181, 196), rgb(147, 203, 229))",
                            transition: "transform 0.3s ease, box-shadow 0.3s ease",
                          }}

                        >
                          <div className="card-body text-center ">
                            <h5 className="card-title fw-bold text-primary">
                              {c.courseName}
                            </h5>
                            <img
                              src="./images/course.png"
                              className="card-img-top img-fluid rounded-top"
                              alt={c.courseName}
                              style={{
                                height: "200px",
                                width: " 400px",
                                objectFit: "cover",
                                filter: "brightness(0.9)",
                              }}
                            />
                            <p className="card-text text-muted text-wrap">
                              {c.description ? c.description.split("\n").map((line, index) => (
                                <React.Fragment key={index}>
                                  {line}
                                  <br />
                                </React.Fragment>
                              )) : "No description available"}
                            </p>

                            <p className="text-muted">
                              <strong>Topics:</strong>
                            </p>
                            <div className="d-flex flex-wrap gap-2 justify-content-center">
                              {c.topics?.length > 0 ? (
                                c.topics.map((topic, idx) => (
                                  <span
                                    key={idx}
                                    className="badge text-dark shadow-sm p-2"
                                    style={{
                                      fontSize: "0.85rem",
                                      borderRadius: "12px",
                                      background:
                                        "linear-gradient(45deg, rgb(84, 190, 219), rgb(150, 181, 196), rgb(147, 203, 229))",
                                    }}
                                  >
                                    {topic}
                                  </span>
                                ))
                              ) : (
                                <span className="badge bg-secondary text-white p-2">
                                  No topics available
                                </span>
                              )}
                            </div>

                            <div className="d-flex justify-content-center gap-2 mt-3">
                              <Link to={`/get-course/${c._id}`} className="btn btn-info text-white shadow-sm">
                                <i className="bi bi-info-circle me-1"></i> Details
                              </Link>
                              <CourseAccessButton c={c} auth={auth} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Carousel Controls */}
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#courseCarousel"
                  data-bs-slide="prev"
                >
                  <span className="carousel-control-prev-icon bg-dark "></span>
                </button>
                <button
                  className="carousel-control-next "
                  type="button"
                  data-bs-target="#courseCarousel"
                  data-bs-slide="next"
                >
                  <span className="carousel-control-next-icon bg-dark"></span>
                </button>
              </div>
            </div>
            <hr />


          </div>
        </Layout>
      )}
    </>
  )
}

export default HomePage