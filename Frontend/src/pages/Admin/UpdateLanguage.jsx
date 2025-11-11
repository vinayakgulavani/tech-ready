import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import AdminMenu from "../../Components/Layout/AdminMenu";
import '../../Styles/FormStyle.css';

const UpdateLanguage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [languageName, setLanguageName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const getSinglesetLanguage = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.SNOWPACK_PUBLIC_API}/language/get-single-language/${params.lang}`
      );
      setLanguageName(data.language.languageName);
      setDescription(data.language.description);
    } catch (error) {
      console.error(error);
      toast.error(`Error fetching language: ${error.response?.data?.message || error.message}`);
    }
  };

  useEffect(() => {
    getSinglesetLanguage();
    //eslint-disable-next-line
  }, []);

  // Update language
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const languageData = { languageName, description };

      const { data } = await axios.put(
        `${import.meta.env.SNOWPACK_PUBLIC_API}/language/update-language/${params.lang}`,
        languageData
      );

      if (data?.success) {
        toast.success("Language updated successfully");
        navigate("/dashboard/admin/language");
      } else {
        toast.error(data?.message || "Failed to update language");
      }
    } catch (error) {
      console.error(error);
      toast.error(`Update failed: ${error.response?.data?.message || error.message}`);
    }
    setLoading(false);
  };

  return (
    <Layout title={"Dashboard - Update Language"}>
      <div className="container-fluid pt-3">
        <div className="row mt-3">
          <div className="col-lg-4 col-md-3 mb-3">
            <AdminMenu />
          </div>
          <div className="col-lg-8 col-md-9 mb-3">
            <div className="admin-form-container">
              <form onSubmit={handleUpdate}>
                <h1>Update Language</h1>
                <div className="mb-3">
                  <label htmlFor="languageName" id="language-name-label">Language Name</label>
                  <input
                    type="text"
                    id="languageName"
                    value={languageName}
                    placeholder="Enter language name"
                    className="form-control"
                    onChange={(e) => setLanguageName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" id="description-label">Description</label>
                  <textarea
                    id="description"
                    value={description}
                    placeholder="Enter language description"
                    rows="4"
                    className="form-control"
                    onChange={(e) => setDescription(e.target.value)}
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
                      <span>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Updating...
                      </span>
                    ) : (
                      "Update Language"
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

export default UpdateLanguage;
