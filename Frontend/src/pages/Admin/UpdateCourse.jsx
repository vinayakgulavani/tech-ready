import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import AdminMenu from "../../Components/Layout/AdminMenu";
import '../../Styles/FormStyle.css';

const UpdateCourse = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [courseName, setCourseName] = useState("");
    const [description, setDescription] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [topics, setTopics] = useState([]);
    const [price, setPrice] = useState("");
    const [loading, setLoading] = useState(false);

    const getSingleCourse = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.SNOWPACK_PUBLIC_API}/course/get-single-course/${params.course}`);
            setCourseName(data.course.courseName);
            setDescription(data.course.description);
            setDifficulty(data.course.difficulty);
            setPrice(data.course.price);
            setTopics(data.course.topics || []);
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong in getting the course");
        }
    };

    useEffect(() => {
        getSingleCourse();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const courseData = { courseName, description, difficulty, topics, price };

            const { data } = await axios.put(
                `${import.meta.env.SNOWPACK_PUBLIC_API}/course/update-course/${params.course}`,
                courseData
            );

            if (data?.success) {
                toast.success("Course Updated Successfully");
                navigate("/dashboard/admin/courses");
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
        setLoading(false);
    };

    const handleTopics = (index, value) => {
        const updateTopic = [...topics];
        updateTopic[index] = value;
        setTopics(updateTopic);
    };

    const handleAddTopic = () => {
        setTopics([...topics, ""]);
    };

    const handleRemoveTopic = (index) => {
        const updatedTopics = topics.filter((_, idx) => idx !== index);
        setTopics(updatedTopics);
    };

    return (
        <Layout title={"Dashboard - Update Course"}>
            <div className="container-fluid pt-3">
                <div className="row mt-3">
                    <div className="col-lg-4 col-md-3 mb-3">
                        <AdminMenu />
                    </div>
                    <div className="col-lg-8 col-md-9 mb-3">
                        <div className="admin-form-container">
                            <form onSubmit={handleUpdate}>
                                <h1 >Update Course</h1>
                                <div className="mb-3">
                                    <label htmlFor="courseName" className="form-label">Course Name</label>
                                    <input
                                        type="text"
                                        value={courseName}
                                        id="courseName"
                                        placeholder="Enter course name"
                                        className="form-control"
                                        onChange={(e) => setCourseName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea
                                        value={description}
                                        id="description"
                                        placeholder="Enter course description"
                                        className="form-control"
                                        onChange={(e) => setDescription(e.target.value)}
                                        rows="3"
                                    ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Topics</label>
                                    {topics.map((topic, index) => (
                                        <div key={index} className="input-group mb-2">
                                            <input
                                                type="text"
                                                value={topic}
                                                onChange={(e) => handleTopics(index, e.target.value)}
                                                className="form-control"
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={() => handleRemoveTopic(index)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                    <button type="button" className="btn btn-success" onClick={handleAddTopic}>Add Topic</button>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="courseprice" className="form-label">Course Price</label>
                                    <input
                                        type="number"
                                        value={price}
                                        id="courseprice"
                                        placeholder="Enter course price"
                                        className="form-control shadow-sm"
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="difficulty" className="form-label">Difficulty Level</label>
                                    <select
                                        value={difficulty}
                                        id="difficulty"
                                        className="form-select"
                                        onChange={(e) => setDifficulty(e.target.value)}
                                    >
                                        <option value="" disabled>Choose Difficulty Level</option>
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Advanced">Advanced</option>
                                    </select>
                                </div>
                                <div className="mb-3 text-center">
                                    <button className="btn btn-primary w-50" type="submit" disabled={loading}>
                                        {loading ? "Updating..." : "Update Course"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default UpdateCourse;
