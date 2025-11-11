import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams, Link, } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import AdminMenu from "../../Components/Layout/AdminMenu";
import '../../Styles/FormStyle.css';

const AddCourseVideos = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [course, setCourse] = useState("");
    const [courseName, setCourseName] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [topics, setTopics] = useState([""]);
    const [videoUrl, setVideoUrl] = useState("");
    const [loading, setLoading] = useState(false);


    const getSingleCourse = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.SNOWPACK_PUBLIC_API}/course/get-single-course/${params.course}`);
            setCourseName(data.course.courseName);
            setCourse(data.course.courseName);
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong in getting the course");
        }
    };

    useEffect(() => {
        getSingleCourse();
    }, []);

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

    // Handle main video change
    const handleMainVideoChange = (e) => {
        setVideoUrl(e.target.files[0]);
    };

    // Create video
    const handleCreate = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("courseName", courseName || course);
            formData.append("title", title);

            // Main video
            if (videoUrl) {
                formData.append("videoUrl", videoUrl);
            }

            const { data } = await axios.post(
                `${import.meta.env.SNOWPACK_PUBLIC_API}/course-video/add-courseVideo/${params.course}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (data?.success) {
                toast.success("Notes created successfully");
                navigate(`/dashboard/admin/update-course/${params.course}`);
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
        setLoading(false);
    };

    return (
        <Layout title={"Dashboard - Add course video "}>
           <div className="container-fluid pt-3">
                <div className="row mt-3">
                    <div className="col-lg-4 col-md-3 mb-3">
                        <AdminMenu />
                    </div>
                    <div className="col-lg-8 col-md-9 mb-3">
                        <div className="admin-form-container">
                            <form onSubmit={handleCreate}>
                                <h1>Create Video</h1>
                                <label>Course Name :</label>
                                <input
                                    value={course}
                                    placeholder="Enter Notes Title"
                                    className="form-control"
                                    readOnly />

                                <div className="mb-3">
                                    <label>Video Title</label>
                                    <input
                                        value={title}
                                        placeholder="Enter Notes Title"
                                        className="form-control"
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="mainImage" className="form-label">Main Image:</label>
                                    <input
                                        type="file"
                                        id="mainVideo"
                                        className="form-control"
                                        name="videoUrl"
                                        onChange={handleMainVideoChange}
                                    />

                                </div>

                                <div className="mb-3">
                                    <label>Description</label>
                                    <textarea
                                        value={description}
                                        placeholder="Enter Description"
                                        className="form-control"
                                        onChange={(e) => setDescription(e.target.value)}
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

                                <div className="mb-3 text-center">
                                    <button className="btn btn-primary w-50" type="submit" disabled={loading}>
                                        {loading ? "Updating..." : "Create Video"}
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

export default AddCourseVideos