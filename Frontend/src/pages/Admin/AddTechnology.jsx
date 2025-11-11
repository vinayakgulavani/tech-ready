import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import AdminMenu from "../../Components/Layout/AdminMenu";
import '../../Styles/FormStyle.css';

const AddTechnology = () => {
  const navigate = useNavigate();
  const [technologyName, setTechnologyName] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [topics, setTopics] = useState([""]);
  const [loading, setLoading] = useState(false);

  // Create technology
  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const technologyData = {
        technologyName,
        description,
        difficulty,
        topics,
      };

      const { data } = await axios.post(
        "${import.meta.env.SNOWPACK_PUBLIC_API}/technology/add-technology",
        technologyData
      );

      if (data?.success) {
        toast.success("Technology Created Successfully");
        navigate("/dashboard/admin/technology");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
    setLoading(false);
  };

  // Handle topics change
  const handleTopics = (index, value) => {
    const updatedTopics = [...topics];
    updatedTopics[index] = value;
    setTopics(updatedTopics);
  };

  // Add new topic field
  const addTopicField = () => {
    setTopics([...topics, ""]);
  };

  // Remove topic field
  const removeTopicField = (index) => {
    const updatedTopics = [...topics];
    updatedTopics.splice(index, 1);
    setTopics(updatedTopics);
  };

  return (
    <Layout title={"Dashboard - Create Technology"}>
      <div className="container-fluid pt-3">
        <div className="row mt-3">
          <div className="col-lg-4 col-md-3 mb-3">
            <AdminMenu />
          </div>
          <div className="col-lg-8 col-md-9 mb-3" >
              <div className="admin-form-container">
                <form onSubmit={handleCreate}>
                  <h1>Create Technology</h1>
                  <div className="mb-3">
                    <label className="form-label">Technology Name</label>
                    <input
                      type="text"
                      value={technologyName}
                      className="form-control"
                      onChange={(e) => setTechnologyName(e.target.value)}
                      placeholder="Enter technology name"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      value={description}
                      className="form-control"
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter technology description"
                      rows="3"
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label>Topics:</label>
                    {topics.map((topic, index) => (
                      <div className="input-group mb-2" key={index}>
                        <input
                          type="text"
                          value={topic}
                          placeholder={`Enter topic ${index + 1}`}
                          className="form-control"
                          onChange={(e) => handleTopics(index, e.target.value)}
                        />
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => removeTopicField(index)}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="btn btn-success mb-3"
                      onClick={addTopicField}
                    >
                      Add Topic
                    </button>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Difficulty Level</label>
                    <select
                      value={difficulty}
                      className="form-select"
                      onChange={(e) => setDifficulty(e.target.value)}
                    >
                      <option value="" disabled>
                        Choose Difficulty Level
                      </option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                  <div className="mb-3 text-center">
                    <button
                      className="btn btn-primary w-50"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Creating..." : "Create Technology"}
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

export default AddTechnology;
