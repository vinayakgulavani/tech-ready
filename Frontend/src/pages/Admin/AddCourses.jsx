import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import AdminMenu from "../../Components/Layout/AdminMenu";
import '../../Styles/FormStyle.css';

const AddCourses = () => {
    const navigate = useNavigate();
    const [courseName, setCourseName] = useState("");
    const [description, setDescription] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [topics, setTopics] = useState([""]);
    const [price, setPrice] = useState("");
    const [loading, setLoading] = useState(false);

    // Create course
    const handleCreate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const courseData = {
                courseName,
                description,
                difficulty,
                topics,
                price
            };

            const { data } = await axios.post(
                "${import.meta.env.SNOWPACK_PUBLIC_API}/course/add-course",
                courseData
            );

            if (data?.success) {
                toast.success("Course Created Successfully");
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

    // Add a new topic field
    const addTopic = () => {
        setTopics([...topics, ""]);
    };

    // Remove a topic field
    const removeTopic = (index) => {
        const updatedTopics = [...topics];
        updatedTopics.splice(index, 1);
        setTopics(updatedTopics);
    };

    // Handle topic change
    const handleTopics = (index, value) => {
        const updatedTopics = [...topics];
        updatedTopics[index] = value;
        setTopics(updatedTopics);
    };

    return (
        <Layout title={"Dashboard - Create Course"}>
            <div className="container-fluid pt-3">
                <div className="row mt-3">
                    <div className="col-lg-4 col-md-3 mb-3">
                        <AdminMenu />
                    </div>
                    <div className="col-lg-8 col-md-9 mb-3">
                        <div className="admin-form-container">
                            <form onSubmit={handleCreate}>
                                <h1 className="text-center mb-4">Create Course</h1>
                                <div className="mb-3">
                                    <label htmlFor="courseName" className="form-label">Course Name</label>
                                    <input
                                        type="text"
                                        value={courseName}
                                        id="courseName"
                                        placeholder="Enter course name"
                                        className="form-control shadow-sm"
                                        onChange={(e) => setCourseName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea
                                        value={description}
                                        id="description"
                                        placeholder="Enter course description"
                                        className="form-control shadow-sm"
                                        onChange={(e) => setDescription(e.target.value)}
                                        rows="3"
                                    ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="">Topics:</label>
                                    {topics.map((topic, index) => (
                                        <div className="input-group mb-2" key={index}>
                                            <input
                                                type="text"
                                                value={topic}
                                                placeholder={`Enter topic ${index + 1}`}
                                                className="form-control shadow-sm"
                                                onChange={(e) => handleTopics(index, e.target.value)}
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={() => removeTopic(index)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        className="btn btn-success mb-3"
                                        onClick={addTopic}
                                    >
                                        Add Topic
                                    </button>
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
                                    <label className="form-label">Difficulty Level</label>
                                    <select
                                        value={difficulty}
                                        className="form-select"
                                        onChange={(e) => setDifficulty(e.target.value)}
                                    >
                                        <option value="" disabled>
                                            Choose Difficulty Level
                                        </option>
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Advanced">Advanced</option>
                                    </select>
                                </div>
                                <div className="mb-3 text-center">
                                    <button className="btn btn-primary w-50" type="submit" disabled={loading}>
                                        {loading ? "Creating..." : "Create Course"}
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

export default AddCourses;
