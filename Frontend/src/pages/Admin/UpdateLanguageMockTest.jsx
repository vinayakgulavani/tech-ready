import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams, Link, } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import AdminMenu from "../../Components/Layout/AdminMenu";
import '../../Styles/FormStyle.css';

const UpdateLanguageMockTest = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [languageName, setLanguageName] = useState("");
    const [mockTest, setMockTest] = useState("");
    const [mockTestNumber, setMockTestNumber] = useState(1);
    const [questions, setQuestions] = useState(Array(2).fill(""));
    const [options, setOptions] = useState(Array(2).fill(["", "", "", ""]));
    const [answers, setAnswers] = useState(Array(2).fill(""));
    const [difficulties, setDifficulties] = useState(Array(2).fill(""));
    const [loading, setLoading] = useState(false);

    const getSinglelanguage = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.SNOWPACK_PUBLIC_API}/language/get-single-language/${params.lang}`);
            setLanguageName(data.language.languageName);
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong in getting the language");
        }
    };

    useEffect(() => {
        getSinglelanguage();
    }, []);


    // Get Single mocktest
    const getSingleMocktest = async () => {
        try {
            const { data } = await axios.get(
                `${import.meta.env.SNOWPACK_PUBLIC_API}/language-mocktest/get-single-mocktest/${params.mocktest}`
            );
            setMockTest(data.mocktest.testName);
            setMockTestNumber(data.mocktest.testNumber);
            setQuestions(data.mocktest.questions.map((q) => q.question));
            setOptions(data.mocktest.questions.map((q) => q.options)); 
            setAnswers(data.mocktest.questions.map((q) => q.answer)); 
            setDifficulties(data.mocktest.questions.map((q) => q.difficulty)); 
            }
             catch (error) {
            console.error(err.message);
            toast.error("Something went wrong in getting the mock test");
        }
    };

    useEffect(() => {
        getSingleMocktest();
    }, []);

    const handleQuestionChange = (qIndex, value) => {
        const newQuestions = [...questions];
        newQuestions[qIndex] = value;
        setQuestions(newQuestions);
    };

    const handleOptionChange = (qIndex, index, value) => {
        const newOptions = [...options];
        newOptions[qIndex] = [...newOptions[qIndex]];  // Deep copy for the specific question's options
        newOptions[qIndex][index] = value;
        setOptions(newOptions);
    };

    const handleAnswerChange = (qIndex, value) => {
        const newAnswers = [...answers];
        newAnswers[qIndex] = value;
        setAnswers(newAnswers);
    };

    const handleDifficultyChange = (qIndex, value) => {
        const newDifficulties = [...difficulties];
        newDifficulties[qIndex] = value;
        setDifficulties(newDifficulties);
    };

    // Create mock test
    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
    
            // Validate each question in the frontend
            for (let i = 0; i < questions.length; i++) {
                const questionText = questions[i];
                const opts = options[i];
                const ans = answers[i];
                const diff = difficulties[i];
    
                // Check if any field is empty or invalid
                if (
                    !questionText ||
                    !Array.isArray(opts) ||
                    !ans ||
                    opts.length !== 4 ||
                    opts.some(opt => !opt) ||  // Check if any option is empty
                    ans === undefined ||
                    !['Easy', 'Medium', 'Hard'].includes(diff)
                ) {
                    toast.error(`Question ${i + 1} is incomplete`);
                    setLoading(false);
                    return;
                }
            }
    
            // Prepare data for API
            const mockTestData = questions.map((question, index) => ({
                question: question,
                options: options[index],
                answer: answers[index],
                difficulty: difficulties[index],
            }));
    
            const { data } = await axios.put(
                `${import.meta.env.SNOWPACK_PUBLIC_API}/language-mocktest/update-mocktest/${params.lang}/${params.mocktest}`,
                { questions: mockTestData ,
                    testName: mockTest,
                    testNumber: mockTestNumber
                },  // Corrected to send as object
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
    
            if (data?.success) {
                toast.success(`Mock Test Updating Successfully`);
                navigate(`/dashboard/admin/update-language/${params.lang}`);
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.error("Error:", error.message);
            toast.error("Something went wrong while updating the mock test");
        }
    
        setLoading(false);
    };
    

    return (
        <Layout title={"Dashboard - Add language mocktest "}>
            <div className="container-fluid pt-3">
                <div className="row mt-3">
                    <div className="col-lg-4 col-md-3 mb-3">
                        <AdminMenu />
                    </div>
                    <div className="col-lg-8 col-md-9 mb-3">
                        <div className="admin-form-container">
                            <form onSubmit={handleUpdate}>
                                <div className="container mt-4">
                                    <div className="text-center mb-4">
                                        <h1 className="display-4">Create Mock Test</h1>
                                    </div>

                                    <div className="card shadow p-4">
                                        <div className="card-body">
                                            <h2 className="card-title">{languageName} : {mockTest}</h2>
                                        </div>
                                    </div>
                                </div>


                                {[...Array(2)].map((_, qIndex) => (
                                    <div key={qIndex} className="mb-4">
                                        <h5>Question {qIndex + 1}:</h5>
                                        <div className="mb-3">
                                            <label htmlFor="">Write question :</label>
                                            <textarea
                                                type="text"
                                                value={questions[qIndex] || ""}
                                                placeholder={`Write question ${qIndex + 1}`}
                                                className="form-control"
                                                onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                                            ></textarea>
                                        </div>

                                        <div className="row">
                                            <label htmlFor="">Write options :</label>
                                            {[0, 1, 2, 3].map((index) => (
                                                <div className="col-md-6 mb-3" key={index}>
                                                    <div className="input-group">
                                                        <span className="input-group-text">
                                                            {`Option ${index + 1}`}
                                                        </span>
                                                        <input
                                                            type="text"
                                                            value={options[qIndex]?.[index] || ""}
                                                            placeholder={`Enter Option ${index + 1}`}
                                                            className="form-control shadow-sm"
                                                            onChange={(e) =>
                                                                handleOptionChange(qIndex, index, e.target.value)
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="">Select answer :</label>
                                            <select
                                                value={answers[qIndex] || ""}
                                                className="form-select shadow-sm"
                                                onChange={(e) => handleAnswerChange(qIndex, e.target.value)}
                                            >
                                                <option value="" disabled>Select the Correct Answer</option>
                                                {options[qIndex]?.filter((opt) => opt.trim() !== "").map((opt, idx) => (
                                                    <option key={idx} value={opt}>{opt}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="">Select difficulty level :</label>
                                            <select
                                                value={difficulties[qIndex] || ""}
                                                className="form-select shadow-sm"
                                                onChange={(e) => handleDifficultyChange(qIndex, e.target.value)}
                                            >
                                                <option value="" disabled>Choose Difficulty Level</option>
                                                <option value="Easy">Easy</option>
                                                <option value="Medium">Medium</option>
                                                <option value="Hard">Hard</option>
                                            </select>
                                        </div>
                                    </div>
                                ))}

                                <div className="mb-3 text-center">
                                    <button className="btn btn-primary w-50" type="submit" disabled={loading}>
                                        {loading ? "Updating..." : "Update Notes"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout >
    )
}
export default UpdateLanguageMockTest