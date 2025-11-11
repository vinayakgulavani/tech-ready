import React, { useState, useEffect } from 'react';
import Layout from '../../Components/Layout/Layout';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import UserMenu from '../../Components/Layout/UserMenu';
import toast from 'react-hot-toast';
import { FaPlus } from 'react-icons/fa';

const EditProfile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');

  // Get User Data
  const getUser = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.SNOWPACK_PUBLIC_API}/auth/viewuser/${id}`);
      setUser(data.user);
      setName(data.user.name);
      setPhone(data.user.phone);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong while fetching user data");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getUser();
    } else {
      toast.error("User ID not found");
    }
  }, [id]);

  // Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password && password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const { data } = await axios.put(`${import.meta.env.SNOWPACK_PUBLIC_API}/auth/edituser/${id}`, {
        name,
        phone,
        password,
      });
      getUser();
      toast.success("Profile Updated Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={'User Dashboard - Edit Profile'}>
      <div className="container-fluid">
           
          <div className="col-10 m-auto mt-4">
            <div className="card p-4 shadow-lg rounded border-0" style={{ backgroundColor: '#f4f7fa' }}>
              <h3 className="title mb-4 text-center text-primary">Edit User Profile</h3>
              {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (


                <form onSubmit={handleSubmit} className="p-3">
                  {/* Profile Image with + Button */}
                  <div className="text-center position-relative mb-4">
                    <img
                      src="https://www.pngmart.com/files/23/Profile-PNG-Photo.png"
                      alt="Profile"
                      className="rounded-circle shadow"
                      style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                    />
                    <button
                      className="btn btn-primary position-absolute"
                      style={{ bottom: '0', right: '35%', borderRadius: '50%' }}
                    >
                      <FaPlus />
                    </button>
                  </div>
                  <div className="form-group mb-4">
                    <label className="form-label">User Name:</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-control rounded-pill shadow-sm"
                      placeholder="Enter User Name"
                      required
                    />
                  </div>

                  <div className="form-group mb-4">
                    <label className="form-label">User Phone:</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="form-control rounded-pill shadow-sm"
                      placeholder="Enter Phone Number"
                      required
                    />
                  </div>

                  <div className="form-group mb-4">
                    <label className="form-label">New Password:</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control rounded-pill shadow-sm"
                      placeholder="Enter New Password (min 6 characters)"
                    />
                  </div>

                  <div className="form-group mb-4">
                    <label className="form-label">Confirm Password:</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="form-control rounded-pill shadow-sm"
                      placeholder="Confirm Your Password"
                    />
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-primary rounded-pill px-4 py-2 shadow-sm"
                      style={{ fontWeight: 'bold' }}
                    >
                      Update Profile
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
    </Layout>
  );
};

export default EditProfile;
