import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaCheck } from "react-icons/fa";
import Layout from "../Components/Layout/Layout";

const CourseMockTest = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [courseName, setCourseName] = useState("");
  const [testName, setTestName] = useState([]);
  const [questions, setQuestions] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [examStarted, setExamStarted] = useState(false);
  const [answers, setAnswers] = useState([]);  // Store previous answers

  const getSingleCourse = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.SNOWPACK_PUBLIC_API}/course/get-single-course/${params.course}`
      );
      setCourseName(data.course.courseName);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong in getting the course");
    }
  };

  useEffect(() => {
    getSingleCourse();
  }, []);

  const getCourseMockTest = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.SNOWPACK_PUBLIC_API}/course-mocktest/get-single-mocktest/${params.mocktest}`
      );
      setTestName(data.mocktest.testName);
      setQuestions(data.mocktest.questions);
      setAnswers(new Array(data.mocktest.questions.length).fill(''));  // Initialize answers array
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong in getting the mock test");
    }
  };

  useEffect(() => {
    getCourseMockTest();
  }, []);

  const handleQuestionNavigation = (index) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = selectedOption;
    setAnswers(updatedAnswers);

    setSelectedOption(answers[index] || '');
    setCurrentQuestion(index);
  };


  const handleOptionChange = (option) => {
    setSelectedOption(option);
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = option;
    setAnswers(updatedAnswers);
  };

  const handleNextQuestion = () => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore((prevScore) => prevScore + 1);
    }
    setSelectedOption(answers[currentQuestion + 1] || '');  // Set next answer if available
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setSelectedOption(answers[currentQuestion - 1] || '');  // Set previous answer if available
      setCurrentQuestion((prevQuestion) => prevQuestion - 1);
    }
  };

  const handleStartExam = () => {
    setExamStarted(true);
  };

  return (
    <Layout title={`Video - ${courseName}`}>
      <div className="container-fluid my-4">
        <div className="text-center">
          <h2 className="display-6 mb-3">{testName}</h2>
          <h4 className="text-muted">{courseName}</h4>
        </div>

        {!examStarted ? (
          <div className="text-center">
            <button
              onClick={handleStartExam}
              className="btn btn-success btn-lg px-5 py-2 shadow-sm"
            >
              Start Exam
            </button>
          </div>
        ) : currentQuestion < questions.length ? (
          <div className="container-fluid">
            <div className="row">
              <div
                className="d-none d-lg-block bg-white shadow rounded p-3 col-lg-3 me-3 "
                style={{
                  height: "400px",
                  overflowY: "auto",
                }}
              >
                <h5 className="text-center mb-3">Questions</h5>
                <div className="d-flex flex-wrap justify-content-center gap-2">
                  {questions.length > 0 &&
                    questions.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuestionNavigation(index)}
                        className={`btn ${currentQuestion === index ? "btn-success" : "btn-outline-success"
                          } shadow-sm`}
                        style={{
                          width: "50px",
                          height: "50px",
                          fontSize: "16px",
                          borderRadius: "8px",
                          transition: "transform 0.2s ease",
                        }}
                        onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")}
                        onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                      >
                        Q{index + 1}
                      </button>
                    ))}
                </div>
              </div>

              <div className="col-lg-8 col-md-8 col-12 card mx-auto my-4 shadow-lg">
                <div className="card-body">
                  <h5 className="card-title">
                    Q{currentQuestion + 1}. {questions[currentQuestion].question}
                  </h5>
                  <div className="list-group">
                    {questions[currentQuestion].options.map((option, index) => (
                      <label key={index} className="list-group-item">
                        <input
                          type="radio"
                          name="option"
                          value={option}
                          checked={selectedOption === option}
                          onChange={() => handleOptionChange(option)}
                          className="form-check-input me-2"
                        />
                        {option}
                      </label>
                    ))}
                  </div>

                  <div className="d-flex justify-content-between mt-3">
                    <button
                      onClick={handlePreviousQuestion}
                      className="btn btn-warning d-flex align-items-center gap-1"
                      disabled={currentQuestion === 0}
                    >
                      <FaArrowLeft />
                      Previous
                    </button>
                    {currentQuestion < questions.length - 1 ? (
                      <button
                        onClick={handleNextQuestion}
                        className="btn btn-primary px-4 shadow d-flex align-items-center gap-1"
                      >
                        Next
                        <FaArrowRight />
                      </button>
                    ) : (
                      <button
                        onClick={handleNextQuestion}
                        className="btn btn-success px-4 shadow d-flex align-items-center gap-1"
                      >
                        Submit
                        <FaCheck />
                      </button>
                    )}
                  </div>

                </div>
              </div>

              <div className="d-lg-none bg-light p-2 w-100 text-center">
                <h6>Questions</h6>
                <div
                  className="d-flex overflow-auto gap-1"
                  style={{
                    whiteSpace: "nowrap",
                    paddingBottom: "5px",
                  }}
                >
                  {questions.length > 0 &&
                    questions.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuestionNavigation(index)}
                        className={`btn btn-sm ${currentQuestion === index ? "btn-success" : "btn-outline-success"
                          } shadow-sm mx-1`}
                        style={{
                          width: "50px",
                          height: "50px",
                          minWidth: "50px",
                          minHeight: "50px",
                          fontSize: "16px",
                          borderRadius: "8px",
                          transition: "transform 0.2s ease",
                        }}
                        onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")}
                        onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                      >
                        Q{index + 1}
                      </button>
                    ))}
                </div>
              </div>

            </div>
          </div>

        ) : (
          <div>
            <div className="card mx-auto my-4 bg-success text-white shadow-lg" style={{ maxWidth: "400px" }}>
              <div className="card-body text-center">
                <h5 className="card-title">Test Completed!</h5>
                <p className="card-text">
                  Your Score: {score} / {questions.length}
                </p>
                <p className="card-text">
                  Percentage: {((score / questions.length) * 100).toFixed(2)}%
                </p>
                <Link to="/" className="btn btn-light mt-2">
                  Home
                </Link>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-8 col-md-8 col-12 card mx-auto my-4 shadow-lg">
                <div className="card-body text-center">
                   <h5 className="mt-4">Answers Summary:</h5>
                  {questions.map((question, index) => {
                    return (
                      <div key={index} className="card my-2 shadow-sm">
                        <div className="card-body">
                          <h6>Q{index + 1}: {question.question}</h6>
                          <div className="list-group">
                            {question.options.map((option, optIndex) => {
                              let answerStyle = "bg-light"; // Default color

                              //Condition 1: Answer Attempted & Correct (Green)
                              if (answers[index] === option && option === question.answer) {
                                answerStyle = "bg-success text-white";
                              }
                              //Condition 2: Answer Attempted & Wrong (Selected = Red, Correct = Blue)
                              else if (answers[index] === option) {
                                answerStyle = "bg-danger text-white";
                              }
                              else if (option === question.answer) {
                                answerStyle = "bg-primary text-white";
                              }

                              return (
                                <label
                                  key={optIndex}
                                  className={`list-group-item ${answerStyle} my-1 rounded`}
                                >
                                  {option}
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <Link to="/" className="btn btn-light mt-3">
                    Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CourseMockTest;
