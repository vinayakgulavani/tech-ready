import React from 'react';
import { useAuth } from '../../context/auth';
import AdminMenu from '../../Components/Layout/AdminMenu';
import Layout from '../../Components/Layout/Layout';
import '../../Styles/AdminDashboard.css';

const AdminDashboard = () => {
    const [auth] = useAuth();
    return (
        <Layout title={'Admin DashBoard - Ecommerce App'}>
            <div className="container-fluid pt-3">
                <div className="row mt-3">
                    <div className="col-lg-4 col-md-3 mb-3">
                        <AdminMenu />
                    </div>
                    <div className="col-lg-8 col-md-9 mb-3">
                        <div class="card profile-card p-4 shadow-lg text-center">
                            <div class="profile-image mb-3">
                                <img
                                    src={auth?.user?.photo || 'https://www.pngmart.com/files/23/Profile-PNG-Photo.png'}
                                    alt="Admin Avatar"
                                    id="admin-photo"
                                    class="rounded-circle"
                                />
                            </div>
                            <h3 class="admin-name">Admin Name: {auth?.user?.name}</h3>
                            <h4 class="admin-email">Admin Email: {auth?.user?.email}</h4>
                            <h4 class="admin-phone">Admin Contact: {auth?.user?.phone}</h4>
                        </div>
                    </div>



                </div>
            </div>
        </Layout>
    );
};

export default AdminDashboard;
