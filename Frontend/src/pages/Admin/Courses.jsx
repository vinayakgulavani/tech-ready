import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, NavLink, Link } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import AdminMenu from "../../Components/Layout/AdminMenu";

const Courses = () => {
    const [courses, setCourses] = useState([]);

    // Get all courses
    const getAllCourses = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.SNOWPACK_PUBLIC_API}/course/get-courses`);
            if (data?.success && Array.isArray(data?.courses)) {
                setCourses(data.courses);
            } else {
                setCourses([]);
                toast.error("No courses found.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong in getting courses");
        }
    };

    useEffect(() => {
        getAllCourses();
    }, []);

    // Delete course
    const handleDelete = async (id) => {
        toast((t) => (
            <span className="m-1">
                Are you sure you want to delete?
                <button
                    onClick={async () => {
                        toast.dismiss(t.id); // Dismiss confirmation toast
                        try {
                            const response = await axios.delete(`${import.meta.env.SNOWPACK_PUBLIC_API}/course/delete-course/${id}`);
                            if (response.data.success) {
                                toast.success("Course deleted successfully!");
                                getAllCourses(); // Refresh courses list
                            } else {
                                toast.error(response.data.message || "Failed to delete course.");
                            }
                        } catch (error) {
                            console.error("Delete error:", error);
                            const errorMessage = error.response?.data?.message || "Failed to delete course.";
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
        <Layout title={"Dashboard - Courses"}>
            <div className="container-fluid pt-3">
                <div className="row mt-3">
                    <div className="col-lg-4 col-md-3 mb-3">
                        <AdminMenu />
                    </div>
                    <div className="col-lg-8 col-md-9 mb-3">
                        {/* Display courses as Cards */}
                        <table className="table table-bordered table-striped">
                            <thead className="table-dark">
                                <tr>
                                    <th>#</th>
                                    <th>Course Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courses.length > 0 ? (
                                    courses.map((c, index) => (
                                        <tr key={c.id || index}>
                                            <td>{index + 1}</td>
                                            <td>{c.courseName}</td>
                                            <td>
                                                <Link to={`/dashboard/admin/update-course/${c._id}`} className="btn btn-sm btn-light mx-2">
                                                    <i className="bi bi-pencil"></i> Edit
                                                </Link>
                                                <a className="btn btn-sm btn-light mx-2" onClick={() => handleDelete(c._id)}>
                                                    <i className="bi bi-trash"></i> Delete
                                                </a>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6">No courses available.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Courses;
