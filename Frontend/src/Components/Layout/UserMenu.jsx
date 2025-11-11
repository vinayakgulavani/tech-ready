import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import '../../Styles/UserMenu.css';
import toast from "react-hot-toast";
import { FaUser, FaSignOutAlt, FaUserEdit, FaInfoCircle } from "react-icons/fa";

const UserMenu = () => {
    const [auth, setAuth] = useAuth();
    const userId = auth?.user?._id;

    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: "",
        });
        localStorage.removeItem("auth");
        toast.success("Logout Successfully");
    };

    return (
        <div className="sidebar card shadow-lg p-3">
            {/* Profile Section */}
            <div className="profile-section text-center mb-3">
                <img
                    src="https://www.pngmart.com/files/23/Profile-PNG-Photo.png"
                    alt="Profile"
                    className="rounded-circle shadow"
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
                <h4 className="mt-2" style={{textTransform: "capitalize"}}>👋 Hello, {auth?.user?.name}!</h4>
                <p className="text-muted">{auth?.user?.email}</p>
                <p className="text-muted">📞 {auth?.user?.phone}</p>

                <div className="d-flex justify-content-center gap-2 mt-2">
                    <Link className="btn btn-success btn-sm" to={`/profile/${userId}`}>
                        <FaUser className="icon" /> Profile
                    </Link>
                    <Link className="btn btn-outline-success btn-sm" to={`/profile/${userId}/edit`}>
                        <FaUserEdit className="icon" /> Edit Profile
                    </Link>
                </div>
            </div>

            <hr className="my-3 border-dark" />

            {/* Logout Button */}
            <div className="text-center mb-3">
                <Link className="btn btn-danger w-100" onClick={handleLogout} to={`/login`}>
                    <FaSignOutAlt className="icon" /> Logout
                </Link>
            </div>

            {/* TechReady Info Section */}
            <div className="techready-info text-center p-3 rounded shadow-sm">
                <h5 className="mb-2"><FaInfoCircle className="icon" /> About TechReady</h5>
                <p className="text-muted small">
                    TechReady is an interactive coding platform for students, offering **short notes, mock tests, coding challenges, and certifications.**
                </p>
                <Link to="/about-techready" className="btn btn-primary btn-sm">Learn More</Link>
            </div>
        </div>
    );
};

export default UserMenu;
