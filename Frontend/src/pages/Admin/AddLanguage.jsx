import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import AdminMenu from "../../Components/Layout/AdminMenu";
import '../../Styles/FormStyle.css';

const AddLanguage = () => {
  const navigate = useNavigate();
  const [languageName, setLanguageName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // Create language
  const handleCreate = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const languageData = { languageName, description };

      const { data } = await axios.post(
        "${import.meta.env.SNOWPACK_PUBLIC_API}/language/add-language",
        languageData
      );

      if (data?.success) {
        toast.success("Language Created Successfully");
        navigate("/dashboard/admin/language");
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
    <Layout title={"Dashboard - Create Language"}>
      <div className="container-fluid pt-3">
        <div className="row mt-3">
          <div className="col-lg-4 col-md-3 mb-3">
            <AdminMenu />
          </div>
          <div className="col-lg-8 col-md-9 mb-3">
            <div className="admin-form-container">
              <form onSubmit={handleCreate} >
                <h1 className="text-center mb-4">Create Language</h1>
                <div className="mb-3">
                  <label htmlFor="languageName" className="form-label">Language Name</label>
                  <input
                    type="text"
                    id="languageName"
                    placeholder="Enter language name"
                    value={languageName}
                    onChange={(e) => setLanguageName(e.target.value)}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea
                    id="description"
                    placeholder="Enter language description"
                    rows="4"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-control"
                  ></textarea>
                </div>

                <div className="mb-3 text-center">
                  <button
                    id="submit-btn"
                    className="btn btn-primary w-50"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    ) : (
                      "Create Language"
                    )}
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

export default AddLanguage;
