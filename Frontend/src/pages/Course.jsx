import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useAuth } from "../context/auth";
import Layout from "../Components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";

const Course = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [auth, setAuth] = useAuth();
    const course = params.course;
    const name = params.name;
    const [Name, setName] = useAuth();
    const [hasAccess, setHasAccess] = useState(false);

    const [courseName, setCourseName] = useState("");
    const [description, setDescription] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [topics, setTopics] = useState([]);
    const [price, setPrice] = useState("");
    const [id, setId] = useState("");

    const checkAccess = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.SNOWPACK_PUBLIC_API}/purchase/check-access/${course}/${name}`);
            setHasAccess(data.purchase);
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong.");
        }
    };

    useEffect(() => {
        checkAccess();
    }, []);

    // form function
    const handlePurchase = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${import.meta.env.SNOWPACK_PUBLIC_API}/purchase/purchase-course/${course}/${name}`, {
                course,
                name
            });

            if (data?.success) {
                toast.success("Course purchase Successfully");
                navigate(`/start-course/${course}/${auth?.user?._id}`);
                checkAccess();

            } else {
                toast.error(data?.message);
            }
        }
        catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

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


    return (
        <Layout title={'Learn Course'}>
            <div className="container-fluid">

                {!hasAccess ? (
                    <div className="container mt-5">
                        <h2 className="mb-4">Purchase Course</h2>
                        <form onSubmit={handlePurchase} className="p-4 border rounded">
                            <div className="mb-3">
                                <label className="form-label">Course Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={courseName}
                                    onChange={(e) => setCourseName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Your Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={auth?.user?.name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

                            <button type="submit" className="btn btn-primary w-100">Pay & Purchase</button>
                        </form>
                    </div>
                ) : (
                    // <div className="d-flex justify-content-center align-items-center mt-4">
                    //     <div className="card shadow-lg p-3 mb-5 bg-white rounded" style={{ maxWidth: "600px", width: "90%" }}>
                    //         <h5 className="card-title text-primary text-center fw-bold">{courseName}</h5>
                    //         <p className="card-text text-muted text-wrap">
                    //             {description ? description.split("\n").map((line, index) => (
                    //                 <React.Fragment key={index}>
                    //                     {line}
                    //                     <br />
                    //                 </React.Fragment>
                    //             )) : "No description available"}
                    //         </p>

                    //         <div className="text-center">
                    //             <h6 className="fw-semibold ">📚 Topics:</h6>
                    //             <div className="d-flex flex-wrap gap-2 justify-content-center">

                    //                 {topics.length > 0 ? (
                    //                     <div className="d-flex flex-wrap gap-2 mb-2">
                    //                         {topics.map((t, idx) => (
                    //                             <span key={idx} className="badge bg-secondary p-2 text-light rounded-2" style={{ fontSize: "14px" }}>{t}</span>
                    //                         ))}
                    //                     </div>
                    //                 ) : (<p className="text-muted">No topics available</p>)}
                    //             </div>
                    //         </div>
                    //         <div className="d-flex gap-2 justify-content-center">
                    //             <p className="m-3">💰 Price: <strong>{price || "Free"}</strong></p>
                    //             <p className="m-3">🚀 Level: <strong>{difficulty || "N/A"}</strong></p>
                    //         </div>
                    //         <div className="text-center">

                    //             <Link to={`/start-course/${course}/${auth?.user?.name}`} className="btn btn-success shadow-sm mt-2">
                    //                 Start Learning
                    //             </Link>
                    //         </div>
                    //     </div>
                    // </div>
                     navigate(`/start-course/${course}/${auth?.user?.name}`)
                )}
            </div>
        </Layout>
    );
};

export default Course;
