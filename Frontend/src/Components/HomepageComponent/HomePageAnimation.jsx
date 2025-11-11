import React from 'react'
import './HomepageAnimation.css'
const HomePageAnimation = () => {
  const courses = [
    { name: "CSS Course", description: "3 month crash course in techready", img: "./images/css.png", position: 1 },
    { name: "Python Course", description: "3 month crash course in techready", img: "./images/py.png", position: 2 },
    { name: "Express Course", description: "3 month crash course in techready", img: "./images/express.png", position: 3 },
    { name: "C++ Course", description: "3 month crash course in techready", img: "./images/cpp.png", position: 4 },
  ];

  return (
    <>
      <div className="banner ">
        <div className="slider d-flex flex-wrap animationcontianer" style={{ "--quantity": courses.length }}>
          {courses.map((course, index) => (
            <div className="item" style={{ "--position": course.position }} key={index}>
              <div className="card m-5" style={{ width: "30vh" }}>
                <div className="card-body ">
                  <h5 className="card-title">{course.name}</h5>
                  <img src={course.img} alt={course.name} />
                  <p style={{ color: "black" }}>{course.description}</p>
                  <button className="btn btn-info ms-1 m-2" > More... </button>
                  <button className="btn btn-outline-info m-1" > Start Learning... </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default HomePageAnimation