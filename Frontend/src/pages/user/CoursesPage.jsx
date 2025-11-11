import React from "react";
import '../../Styles/CoursesPage.css'

const courses = [
      {
        name: "JavaScript Basics",
        description: "Learn the fundamentals of JavaScript, the language of the web.",
        progress: 60,
        image: "https://wallpaperaccess.com/full/1555163.jpg",
      },
      {
        name: "React for Beginners",
        description: "Get started with React, building dynamic and reactive UIs.",
        progress: 40,
        image: "https://www.freecodecamp.org/news/content/images/size/w2000/2020/02/Ekran-Resmi-2019-11-18-18.08.13.png",
      },
      {
        name: "Node.js Essentials",
        description: "Understand server-side JavaScript with Node.js core concepts.",
        progress: 75,
        image: "https://tse2.mm.bing.net/th?id=OIP.5gf2JQQmWla-GU-WXTrGcgHaE8&pid=Api&P=0&h=180",
      },
      {
        name: "MongoDB Mastery",
        description: "Dive into NoSQL databases with MongoDB and learn key operations.",
        progress: 50,
        image: "https://tse3.mm.bing.net/th?id=OIP.iWsHU_6Lw7Ss3zTt95gQZgHaD8&pid=Api&P=0&h=180",
      },
      {
        name: "Full-Stack MERN",
        description: "Combine MongoDB, Express, React, and Node to build full-stack apps.",
        progress: 20,
        image: "https://wallpapercave.com/wp/wp8904080.jpg",
      },
    ];
    
    // Single course card component
    const CourseCard = ({ name, description, progress, image }) => {
      return (
        <div className="card mb-4 " style={{ width: "18rem" }}>
          {/* Course Image */}
          <img src={image} className="card-img-top" alt={name} />
    
          {/* Card Body */}
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="course-description">{description}</p>
    
            {/* Progress Bar */}
            <div className="progress mb-3">
              <div
                className="progress-bar progress-bar-striped bg-success"
                role="progressbar"
                style={{ width: `${progress}%` }}
                aria-valuenow={progress}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {progress}%
              </div>
            </div>
    
            <button className="btn btn-primary w-100">View Course</button>
          </div>
        </div>
      );
    };
    
    const CoursesPage = () => {
      return (
        <div id="courses-page" className="container-fluid">
          <h1 className="text-center mb-5 pt-4">My Courses</h1>
    
          <div className="row justify-content-center">
            {courses.map((course) => (
              <div className="col-md-4 d-flex justify-content-center" key={course.name}>
                <CourseCard {...course} />
              </div>
            ))}
          </div>
        </div>
      );
    };
    
    export default CoursesPage;
    
