import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import AdminMenu from "../../Components/Layout/AdminMenu"

const UpdateCourseDetails = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [courseName, setCourseName] = useState("");
    const [description, setDescription] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [topics, setTopics] = useState([]);
    const [price, setPrice] = useState("");
    const [id, setId] = useState("");

    const [notes, setNotes] = useState([]);
    const [video, setVideo] = useState([]);
    const [mockTest, setMocktest] = useState([]);
    const [loading, setLoading] = useState(false);

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

    useEffect(() => {
        getSingleCourse();
    }, []);

    const getCourseNotes = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.SNOWPACK_PUBLIC_API}/course-notes/get-single-courseNotes/${params.course}`);
            setNotes(data.notes);
        }
        catch (err) {
            console.error(err);
            toast.error("Something went wrong in getting the notes");
        }
    }
    useEffect(() => {
        getCourseNotes();
    }, []);

    const getCourseVideo = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.SNOWPACK_PUBLIC_API}/course-video/get-single-courseVideo/${params.course}`);
            setVideo(data.Video);
        }
        catch (err) {
            console.error(err);
            toast.error("Something went wrong in getting the video");
        }
    }
    useEffect(() => {
        getCourseVideo();
    }, []);

    const getCourseMockTest = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.SNOWPACK_PUBLIC_API}/course-mocktest/get-mocktest/${params.course}`);
            setMocktest(data.questions);
        }
        catch (err) {
            console.error(err);
            toast.error("Something went wrong in getting the mock test");
        }
    }
    useEffect(() => {
        getCourseMockTest();
    }, []);


    // Delete Notes
    const handleDeleteNotes = async (id) => {
        toast((t) => (
            <span className="m-1">
                Are you sure you want to delete?
                <button
                    onClick={async () => {
                        toast.dismiss(t.id); // Dismiss confirmation toast
                        try {
                            const response = await axios.delete(`${import.meta.env.SNOWPACK_PUBLIC_API}/course-notes/delete-single-notes/${id}`);
                            console.log("Delete Response:", response.data); // Debugging

                            if (response.data.success) {
                                toast.success("Notes deleted successfully!");
                                getCourseNotes(); // Refresh notes list
                            } else {
                                toast.error(response.data.message || "Failed to delete note.");
                            }
                        } catch (error) {
                            console.error("Delete error:", error);
                            const errorMessage = error.response?.data?.message || "Failed to delete note.";
                            toast.error(errorMessage);
                        }
                    }}
                    className="btn btn-danger btn-sm m-1"
                >
                    Yes
                </button>
                <button onClick={() => toast.dismiss(t.id)} className="btn btn-secondary btn-sm m-1">
                    No
                </button>
            </span>
        ));
    };


    // Delete video
    const handleDeleteVideo = async (id) => {
        toast((t) => (
            <span className="m-1">
                Are you sure you want to delete?
                <button
                    onClick={async () => {
                        toast.dismiss(t.id); // Dismiss confirmation toast
                        try {
                            const response = await axios.delete(`${import.meta.env.SNOWPACK_PUBLIC_API}/course-video/delete-courseVideo/${id}`);
                            console.log("Delete Response:", response.data); // Debugging

                            if (response.data.success) {
                                toast.success("video deleted successfully!");
                                getCourseVideo(); // Refresh notes list
                            } else {
                                toast.error(response.data.message || "Failed to delete note.");
                            }
                        } catch (error) {
                            console.error("Delete error:", error);
                            const errorMessage = error.response?.data?.message || "Failed to delete note.";
                            toast.error(errorMessage);
                        }
                    }}
                    className="btn btn-danger btn-sm m-1"
                >
                    Yes
                </button>
                <button onClick={() => toast.dismiss(t.id)} className="btn btn-secondary btn-sm m-1">
                    No
                </button>
            </span>
        ));
    };


    // Delete mocktest
    const handleDeleteMockTest = async (id) => {
        toast((t) => (
            <span className="m-1">
                Are you sure you want to delete?
                <button
                    onClick={async () => {
                        toast.dismiss(t.id); // Dismiss confirmation toast
                        try {
                            const response = await axios.delete(`${import.meta.env.SNOWPACK_PUBLIC_API}/course-mocktest/delete-mocktest/${id}`);
                            console.log("Delete Response:", response.data); // Debugging

                            if (response.data.success) {
                                toast.success("Mock test deleted successfully!");
                                getCourseMockTest(); // Refresh notes list
                            } else {
                                toast.error(response.data.message || "Failed to delete mock test.");
                            }
                        } catch (error) {
                            console.error("Delete error:", error);
                            const errorMessage = error.response?.data?.message || "Failed to delete mock test.";
                            toast.error(errorMessage);
                        }
                    }}
                    className="btn btn-danger btn-sm m-1"
                >
                    Yes
                </button>
                <button onClick={() => toast.dismiss(t.id)} className="btn btn-secondary btn-sm m-1">
                    No
                </button>
            </span>
        ));
    };


    return (
        <Layout title={"Dashboard - Update Course"}>
            <div className="container-fluid pt-3">
                <div className="row mt-3">
                    <div className="col-lg-4 col-md-3 mb-3">
                        <AdminMenu />
                    </div>
                    <div className="col-lg-8 col-md-9 mb-3 row">
                        <div className="col-12 mb-3">
                            <div className="card h-100 shadow-lg border-0 rounded-3">
                                <div className="card-body">
                                    <h5 className="card-title text-primary fw-bold">{courseName}</h5>
                                    {/* <p className="card-text text-muted text-wrap">
                                        {description || "No description available"}
                                    </p> */}
                                    <p className="card-text text-muted text-wrap">
                                        {description ? description.split("\n").map((line, index) => (
                                            <React.Fragment key={index}>
                                                {line}
                                                <br />
                                            </React.Fragment>
                                        )) : "No description available"}
                                    </p>
                                    <h6 className="fw-semibold">📚 Topics:</h6>
                                    {Array.isArray(topics) && topics.length > 0 ? (
                                        <div className="d-flex flex-wrap gap-2 mb-2">
                                            {topics?.map((t, idx) => (
                                                <span
                                                    key={idx}
                                                    className="badge bg-secondary p-2 text-light rounded-2"
                                                    style={{ fontSize: "14px" }}
                                                >
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-muted">No topics available</p>
                                    )}
                                    <p className="mb-1">
                                        💰 Price: <strong>{price || "Free"}</strong>
                                    </p>
                                    <p className="mb-3">
                                        🚀 Level: <strong>{difficulty || "N/A"}</strong>
                                    </p>
                                    <Link to={`/dashboard/admin/update-courseName/${params.course}`} className="btn btn-outline-primary btn-sm">
                                        <i className="bi bi-pencil"></i> Edit
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className=" col-12 row">
                            <div className=" col-sm-10 mb-3">
                                <Link to={`/dashboard/admin/add-courseNotes/${params.course}`} className="btn btn-sm btn-success mb-2">
                                    Add Notes
                                </Link>
                                <div className="table-responsive">
                                    <table className="table table-bordered table-striped">
                                        <thead className="table-dark">
                                            <tr>
                                                <th className="row-light" colSpan="4">Notes </th>
                                            </tr>
                                            <tr>
                                                <th>#</th>
                                                <th>Notes Title</th>
                                                <th>Sub titles</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {notes?.length > 0 ? (
                                                notes.map((n, index) => (
                                                    <tr key={n.id || index}>
                                                        <td>{index + 1}</td>
                                                        <td>{n.notestitle || "N/A"}</td>
                                                        <td>
                                                            {n.subtitle && Array.isArray(n.subtitle) ? (
                                                                n.subtitle.map((sub, idx) => (
                                                                    <div
                                                                        key={idx}
                                                                        style={{
                                                                            padding: "5px",
                                                                            margin: "2px 0",
                                                                            backgroundColor: "#f8f9fa",
                                                                            borderRadius: "5px",
                                                                            border: "1px solid #ddd",
                                                                        }}
                                                                    >
                                                                        {sub}
                                                                    </div>
                                                                ))
                                                            ) : (
                                                                <div
                                                                    style={{
                                                                        padding: "5px",
                                                                        backgroundColor: "#f8f9fa",
                                                                        borderRadius: "5px",
                                                                        border: "1px solid #ddd",
                                                                    }}
                                                                >
                                                                    {n.subtitle || "N/A"}
                                                                </div>
                                                            )}
                                                        </td>
                                                        <td>
                                                            <Link to={`/dashboard/admin/update-courseNotes/${params.course}/${n._id}`} className="btn btn-sm btn-success mx-2">
                                                                <i className="bi bi-pencil"></i> Edit
                                                            </Link>
                                                            <a className="btn btn-sm btn-light mx-2" onClick={() => handleDeleteNotes(n._id)}>
                                                                <i className="bi bi-trash"></i> Delete
                                                            </a>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="4">No Notes available.</td>
                                                </tr>
                                            )}

                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className=" col-sm-10 mb-3">
                                <Link to={`/dashboard/admin/add-courseVideo/${id}`} className="btn btn-sm btn-success mb-2">
                                    Add Video
                                </Link>
                                <div className="table-responsive">
                                    <table className="table table-bordered table-striped">
                                        <thead className="table-dark">
                                            <tr>
                                                <th className="row-light" colSpan="5">Video </th>
                                            </tr>
                                            <tr>
                                                <th>#</th>
                                                <th>title</th>
                                                <th>Description</th>
                                                <th>Topics</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {video?.length > 0 ? (
                                                video.map((v, index) => (
                                                    <tr key={v.id || index}>
                                                        <td>{index + 1}</td>
                                                        <td>{v.title || "N/A"}</td>
                                                        <td>{v.description || "N/A"}</td>
                                                        <td>
                                                            {v.topics && Array.isArray(v.topics) ? (
                                                                <div className="d-flex flex-wrap gap-2">
                                                                    {v.topics.map((t, idx) => (
                                                                        <span
                                                                            key={idx}
                                                                            className={`badge btn btn-secondary p-2 rounded text-light"
                                                                        }`}
                                                                            style={{ fontSize: "14px", minWidth: "100px" }}
                                                                        >
                                                                            {t}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            ) : (
                                                                <div className="text-muted">No topics</div>
                                                            )}
                                                        </td>
                                                        <td>
                                                            <Link to={`/dashboard/admin/update-courseVideo/${params.course}/${v._id}`} className="btn btn-sm btn-success mx-2">
                                                                <i className="bi bi-pencil"></i> Edit
                                                            </Link>
                                                            <a className="btn btn-sm btn-light mx-2" onClick={() => handleDeleteVideo(v._id)}>
                                                                <i className="bi bi-trash"></i> Delete
                                                            </a>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="5">No video available.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className=" col-sm-10 mb-3">
                                <Link to={`/dashboard/admin/add-courseMocktest/${id}`} className="btn btn-sm btn-success mb-2">
                                    Add Mocktest
                                </Link>
                                <div className="table-responsive">
                                    <table className="table table-bordered table-striped">
                                        <thead className="table-dark">
                                            <tr>
                                                <th className="row-light" colSpan="7">Mock Test </th>
                                            </tr>
                                            <tr>
                                                <th>#</th>
                                                <th>Mock Test Name</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {mockTest?.length > 0 ? (
                                                mockTest.map((mt, index) => (
                                                    <tr key={mt.id || index}>
                                                        <td>{index + 1}</td>
                                                        <td>{mt.testName || "N/A"}</td>
                                                        <td>
                                                            <Link to={`/dashboard/admin/update-courseMocktest/${params.course}/${mt._id}`} className="btn btn-sm btn-success mx-2">
                                                                <i className="bi bi-pencil"></i> Edit
                                                            </Link>
                                                            <a className="btn btn-sm btn-light mx-2" onClick={() => handleDeleteMockTest(mt._id)}>
                                                                <i className="bi bi-trash"></i> Delete
                                                            </a>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="5">No video available.</td>
                                                </tr>
                                            )}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout >
    )
}

export default UpdateCourseDetails