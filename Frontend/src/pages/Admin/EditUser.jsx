import React, { useState, useEffect } from 'react';
import Layout from '../../Components/Layout/Layout';
import AdminMenu from '../../Components/Layout/AdminMenu';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaPlus } from 'react-icons/fa';

const EditUser = () => {
  const [user, setUser] = useState({});
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
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong while fetching user data");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

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
      toast.success("Profile Updated Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={'User Dashboard - Edit Profile'}>
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 ps-3 ">
            <div className="card p-4 shadow-lg rounded m-3">
              <h4 className="title mb-4">Edit User Profile</h4>

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

              {/* Form */}
              <form onSubmit={handleSubmit}>
                <label>User Name:</label>
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    placeholder="Enter User Name"
                    required
                  />
                </div>

                <label>User Phone:</label>
                <div className="mb-3">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control"
                    placeholder="Enter Phone Number"
                    required
                  />
                </div>

                <label>New Password:</label>
                <div className="mb-3">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    placeholder="Enter New Password (min 6 characters)"
                  />
                </div>

                <label>Confirm Password:</label>
                <div className="mb-3">
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="form-control"
                    placeholder="Confirm Your Password"
                  />
                </div>

                <button type="submit" className="btn btn-primary">Update Profile</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditUser;
