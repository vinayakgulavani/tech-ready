import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Layout from '../../Components/Layout/Layout'
import AdminMenu from '../../Components/Layout/AdminMenu'
import { Link } from "react-router-dom";

const Users = () => {
    const [users, setUsers] = useState([]); // All Users
    const [filteredUsers, setFilteredUsers] = useState([]); // Search Result
    const [search, setSearch] = useState(""); // Search Input

    // Fetch users from API
    const getAllUsers = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.SNOWPACK_PUBLIC_API}/auth/all-users`);
            setUsers(data.users);
            setFilteredUsers(data.users); // Initially same as users
        }
        catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    // Handle Search Input Change
    const handleSearch = (e) => {
        const keyword = e.target.value.toLowerCase();
        setSearch(keyword);

        if (keyword === "") {
            setFilteredUsers(users); // Reset if empty
        } else {
            const results = users.filter(user =>
                user.name.toLowerCase().includes(keyword) ||
                user.email.toLowerCase().includes(keyword)
            );
            setFilteredUsers(results);
        }
    };

    // Handle Reset
    const handleReset = () => {
        setSearch("");
        setFilteredUsers(users);
    };

    //delete user
    const handleDelete = async (id) => {
        toast((t) => (
            <span className="m-1">
                Are you sure you want to delete?
                <button 
                    onClick={async () => {
                        toast.dismiss(t.id); // Dismiss confirmation toast
                        try {
                            const response = await axios.delete(`${import.meta.env.SNOWPACK_PUBLIC_API}/auth/deleteuser/${id}`);
                            console.log("Delete Response:", response.data); // Debugging

                            if (response.data.success) {
                                toast.success("User deleted successfully!");
                                getAllUsers();  // Refresh users list
                            } else {
                                toast.error(response.data.message || "Failed to delete user.");
                            }
                        } catch (error) {
                            console.error("Delete error:", error);
                            const errorMessage = error.response?.data?.message || "Failed to delete user.";
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
        <Layout title={'Admin Dashboard - TechReady'}>
           <div className="container-fluid pt-3">
                <div className="row mt-3">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9 ">
                        <div className="text-center">
                            <h1>All Users</h1>
                        </div>
                        <div className="row mb-2">
                            <div className="col-8 col-sm-6 mb-2 mb-sm-0">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search Name or Email..."
                                    value={search}
                                    onChange={handleSearch}
                                />
                            </div>
                            <div className="col-4 col-sm-2">
                                <button className="btn btn-primary w-100" onClick={handleReset}>
                                    Reset
                                </button>
                            </div>

                        </div>
                        <div className="table-responsive">
                            <table className="table table-striped table-bordered">
                                <thead className="table-dark">
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.length > 0 ? (
                                        filteredUsers.map((user, index) => (
                                            <tr key={user._id}>
                                                <td>{index + 1}</td>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>{user.phone}</td>
                                                <td>
                                                    <Link to={`/dashboard/admin/users/view/${user._id}`} className="btn btn-sm btn-light">
                                                        <i className="bi bi-eye"></i> View
                                                    </Link>
                                                    <Link to={`/dashboard/admin/users/edit/${user._id}`} className="btn btn-sm btn-light mx-2">
                                                        <i className="bi bi-pencil"></i> Edit
                                                    </Link>
                                                    <a className="btn btn-sm btn-light mx-2" onClick={() => handleDelete(user._id)}>
                                                        <i className="bi bi-trash"></i> Delete
                                                    </a>

                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="text-center">No Users Found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Layout >
    );
}

export default Users;
