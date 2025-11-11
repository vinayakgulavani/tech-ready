import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import AdminMenu from "../../Components/Layout/AdminMenu";
import '../../Styles/FormStyle.css';

const UpdateTechnology = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [technologyName, setTechnologyName] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get single technology
  const getSingleTechnology = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.SNOWPACK_PUBLIC_API}/technology/get-single-technology/${params.id}`);
      setTechnologyName(data.technology.technologyName);
      setDescription(data.technology.description);
      setDifficulty(data.technology.difficulty);
      setTopics(data.technology.topics || []);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong in getting the technology");
    }
  };

  useEffect(() => {
    getSingleTechnology();
  }, []);

  // Update technology
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const technologyData = { technologyName, description, difficulty, topics };
      const { data } = await axios.put(`${import.meta.env.SNOWPACK_PUBLIC_API}/technology/update-technology/${params.id}`, technologyData);
      if (data?.success) {
        toast.success("Technology Updated Successfully");
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

  // Add a new topic
  const handleAddTopic = () => {
    setTopics([...topics, ""]);
  };

  // Remove a topic
  const handleRemoveTopic = (index) => {
    const updatedTopics = topics.filter((_, i) => i !== index);
    setTopics(updatedTopics);
  };

  // Handle topic change
  const handleTopicChange = (index, value) => {
    const updatedTopics = [...topics];
    updatedTopics[index] = value;
    setTopics(updatedTopics);
  };

  return (
    <Layout title={"Dashboard - Update Technology"}>
      <div className="container-fluid pt-3">
        <div className="row mt-3">
          <div className="col-lg-4 col-md-3 mb-3">
            <AdminMenu />
          </div>
          <div className="col-lg-8 col-md-9 mb-3">
            <div className="admin-form-container">
              <form onSubmit={handleUpdate}>
                <h1 >Update Technology</h1>
                <div className="mb-3">
                  <label className="form-label">Technology Name</label>
                  <input
                    type="text"
                    value={technologyName}
                    className="form-control"
                    onChange={(e) => setTechnologyName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    value={description}
                    className="form-control"
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Topics</label>
                  {topics.map((topic, index) => (
                    <div key={index} className="input-group mb-2">
                      <input
                        type="text"
                        value={topic}
                        onChange={(e) => handleTopicChange(index, e.target.value)}
                        className="form-control"
                      />
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleRemoveTopic(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button type="button" className="btn btn-success" onClick={handleAddTopic}>Add Topic</button>
                </div>
                <div className="mb-3 text-center">
                  <button id="submit-btn" className="btn btn-primary" type="submit" disabled={loading}>
                    {loading ? "Updating..." : "Update Technology"}
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

export default UpdateTechnology;
