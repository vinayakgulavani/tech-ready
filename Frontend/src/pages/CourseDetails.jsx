import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import { useAuth } from "../context/auth";

const CourseDetails = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [auth, setAuth] = useAuth();

    const [courseName, setCourseName] = useState("");
    const [description, setDescription] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [topics, setTopics] = useState([]);
    const [price, setPrice] = useState("");
    const [id, setId] = useState("");

    const [notes, setNotes] = useState([]);
    const [video, setVideo] = useState([]);
    const [mockTest, setMocktest] = useState([]);

    const [hasAccess, setHasAccess] = useState(false);

    const checkAccess = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.SNOWPACK_PUBLIC_API}/purchase/check-access/${params.course}/${auth?.user?._id}`);
            setHasAccess(data.purchase);
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong.");
        }
    };

    useEffect(() => {
        checkAccess();
    }, []);


    useEffect(() => {
        const getSingleCourse = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.SNOWPACK_PUBLIC_API}/course/get-single-course/${params.course}`);
                setCourseName(data.course.courseName);
                setDescription(data.course.description);
                setDifficulty(data.course.difficulty);
                setPrice(data.course.price);
                setTopics(data.course.topics || []);
                setId(data.course._id);
            } catch (error) {
                console.error(error);
                toast.error("Something went wrong in getting the course");
            }
        };
        getSingleCourse();
    }, []);

    useEffect(() => {
        const getCourseNotes = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.SNOWPACK_PUBLIC_API}/course-notes/get-single-courseNotes/${params.course}`);
                setNotes(data.notes);
            }
            catch (err) {
                console.error(err);
                toast.error("Something went wrong in getting the notes");
            }
        };
        getCourseNotes();
    }, []);

    useEffect(() => {
        const getCourseVideo = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.SNOWPACK_PUBLIC_API}/course-video/get-single-courseVideo/${params.course}`);
                setVideo(data.Video);
            }
            catch (err) {
                console.error(err);
                toast.error("Something went wrong in getting the video");
            }
        };
        getCourseVideo();
    }, []);

    useEffect(() => {
        const getCourseMockTest = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.SNOWPACK_PUBLIC_API}/course-mocktest/get-mocktest/${params.course}`);
                setMocktest(data.questions);
            }
            catch (err) {
                console.error(err);
                toast.error("Something went wrong in getting the mock test");
            }
        };
        getCourseMockTest();
    }, []);

    return (
        <Layout title={"Course details"}>
            <div className="container-fluid">
                <div className="col-10 m-auto mb-3 mt-4 card h-100 p-2 shadow-lg border-0 rounded-3">
                    <div className="card-body">
                        <h5 className="card-title text-primary text-center fw-bold">{courseName}</h5>
                        <p className="card-text text-muted text-wrap">
                            {description ? description.split("\n").map((line, index) => (
                                <React.Fragment key={index}>
                                    {line}
                                    <br />
                                </React.Fragment>
                            )) : "No description available"}
                        </p>

                        <div className="text-center">
                            <h6 className="fw-semibold ">📚 Topics:</h6>
                            <div className="d-flex flex-wrap gap-2 justify-content-center">

                                {topics.length > 0 ? (
                                    <div className="d-flex flex-wrap gap-2 mb-2">
                                        {topics.map((t, idx) => (
                                            <span key={idx} className="badge bg-secondary p-2 text-light rounded-2" style={{ fontSize: "14px" }}>{t}</span>
                                        ))}
                                    </div>
                                ) : (<p className="text-muted">No topics available</p>)}
                            </div>
                        </div>
                        <div className="d-flex gap-2 justify-content-center">
                            <p className="m-3">💰 Price: <strong>{price || "Free"}</strong></p>
                            <p className="m-3">🚀 Level: <strong>{difficulty || "N/A"}</strong></p>
                        </div>
                        <div className="text-center">
                            {!hasAccess ? (
                                <Link to={`/access-course/${params.course}/${auth?.user?._id}`} className="btn btn-info shadow-sm">
                                    <i className="bi bi-plus-circle me-1"></i> Start Learning
                                </Link>
                            ) : (
                                <Link to={`/start-course/${params.course}/${auth?.user?.name}`} className="btn btn-success shadow-sm mt-2">
                                    Start Learning
                                </Link>
                            )}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-4 mb-3">
                            <div className="table-responsive">
                                <table className="table table-bordered table-striped">
                                    <thead className="table-dark">
                                        <tr>
                                            <th colSpan="2" className="text-center">📖 Notes</th>
                                        </tr>
                                        <tr>
                                            <th>#</th><th>Title</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {notes.length > 0 ? (
                                            notes.map((n, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{n.notestitle || "N/A"}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="2">No Notes available.</td>
                                            </tr>)}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="col-lg-4 mb-3">
                            <div className="table-responsive">
                                <table className="table table-bordered table-striped">
                                    <thead className="table-dark">
                                        <tr>
                                            <th colSpan="3" className="text-center">🎥 Videos</th>
                                        </tr>
                                        <tr>
                                            <th>#</th>
                                            <th>Title</th>
                                            <th>Description</th></tr>
                                    </thead>
                                    <tbody>
                                        {video.length > 0 ? (
                                            video.map((v, index) => (
                                                <tr key={index}><td>{index + 1}</td><td>{v.title || "N/A"}</td><td>{v.description || "N/A"}</td></tr>
                                            ))
                                        ) : (<tr><td colSpan="2">No videos available.</td></tr>)}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="col-lg-4 mb-3">
                            <div className="table-responsive">
                                <table className="table table-bordered table-striped">
                                    <thead className="table-dark">
                                        <tr><th colSpan="2" className="text-center">📝 Mock Tests</th></tr>
                                        <tr><th>#</th><th>Test Name</th></tr>
                                    </thead>
                                    <tbody>
                                        {mockTest.length > 0 ? (
                                            mockTest.map((mt, index) => (
                                                <tr key={index}><td>{index + 1}</td><td>{mt.testName || "N/A"}</td></tr>
                                            ))
                                        ) : (<tr><td colSpan="2">No mock tests available.</td></tr>)}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CourseDetails;
