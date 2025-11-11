import React, { useState, useEffect } from 'react';
import Layout from '../../Components/Layout/Layout';
import AdminMenu from '../../Components/Layout/AdminMenu';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import '../../Styles/ViewUser.css';

const EditUser = () => {
  const [user, setUser] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const { id } = useParams();

  // Get user data
  const getuser = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.SNOWPACK_PUBLIC_API}/auth/viewuser/${id}`);
      setUser(data.user);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong while fetching user data");
    }
  };

  useEffect(() => {
    getuser();
  }, []);

  return (
    <Layout title={'User Dashboard - Your Profile'}>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="container-fluid">
        <div className="row mt-5">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 ps-3">
            <div className="card p-4 shadow-lg rounded profile-card m-3">
              <div className="profile-header">
                <div className="profile-image-container">
                  <img
                    src={profileImage || "https://www.pngmart.com/files/23/Profile-PNG-Photo.png"}
                    alt="Profile"
                    className="profile-image"
                  />
                </div>
                <div className="profile-details">
                  <h4 className="profile-name">{user?.name}</h4>
                  <p className="profile-email">{user?.email}</p>
                  <p className="profile-phone">{user?.phone}</p>
                </div>
              </div>
              <div className="profile-actions">
                <Link to={`/dashboard/admin/users/edit/${user._id}`}>
                  <button className="follow-btn">Edit Profile</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditUser;
