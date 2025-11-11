import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import AdminMenu from "../../Components/Layout/AdminMenu";

const UpdateLanguageDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [languageName, setLanguageName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const [notes, setNotes] = useState([]);
  const [mockTest, setMocktest] = useState([]);

  const getSingleLanguage = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.SNOWPACK_PUBLIC_API}/language/get-single-language/${params.lang}`);
      setLanguageName(data.language.languageName);
      setDescription(data.language.description);

    } catch (error) {
      console.error(error);
      toast.error("Something went wrong in getting the language");
    }
  };

  useEffect(() => {
    getSingleLanguage();
  }, []);

  const getLanguageNotes = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.SNOWPACK_PUBLIC_API}/language-notes/get-languageNotes/${params.lang}`);
      setNotes(data.notes);
    }
    catch (err) {
      console.error(err);
      toast.error("Something went wrong in getting the notes");
    }
  }
  useEffect(() => {
    getLanguageNotes();
  }, []);


  const getLanguageMockTest = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.SNOWPACK_PUBLIC_API}/language-mocktest/get-mocktest/${params.lang}`);
      setMocktest(data.questions);
    }
    catch (err) {
      console.error(err);
      toast.error("Something went wrong in getting the mock test");
    }
  }
  useEffect(() => {
    getLanguageMockTest();
  }, []);



  // Delete Notes
  const handleDeleteNotes = async (id) => {
    toast((t) => (
      <span className="m-1">
        Are you sure you want to delete?
        <button
          onClick={async () => {
            toast.dismiss(t.id); // Dismiss confirmation toast
            try {
              const response = await axios.delete(`${import.meta.env.SNOWPACK_PUBLIC_API}/language-notes/delete-languageNotes/${id}`);
              console.log("Delete Response:", response.data); // Debugging

              if (response.data.success) {
                toast.success("Notes deleted successfully!");
                getLanguageNotes();// Refresh notes list
              } else {
                toast.error(response.data.message || "Failed to delete note.");
              }
            } catch (error) {
              console.error("Delete error:", error);
              const errorMessage = error.response?.data?.message || "Failed to delete note.";
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


  // Delete mocktest
  const handleDeleteMockTest = async (id) => {
    toast((t) => (
      <span className="m-1">
        Are you sure you want to delete?
        <button
          onClick={async () => {
            toast.dismiss(t.id); // Dismiss confirmation toast
            try {
              const response = await axios.delete(`${import.meta.env.SNOWPACK_PUBLIC_API}/language-mocktest/delete-mocktest/${id}`);
              console.log("Delete Response:", response.data); // Debugging

              if (response.data.success) {
                toast.success("Mock test deleted successfully!");
                getLanguageMockTest(); // Refresh notes list
              } else {
                toast.error(response.data.message || "Failed to delete mock test.");
              }
            } catch (error) {
              console.error("Delete error:", error);
              const errorMessage = error.response?.data?.message || "Failed to delete mock test.";
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
    <Layout title={"Dashboard - Language update"}>
      <div className="container-fluid pt-3">
        <div className="row mt-3">
          <div className="col-lg-4 col-md-3 mb-3">
            <AdminMenu />
          </div>
          <div className="col-lg-8 col-md-9 mb-3">
            <div className="col-12 card shadow-lg border-0 rounded-3 mb-3 text-center bg-light">
              <div className="card-body p-4">
                <h2 className="card-title text-primary fw-bold" style={{ fontSize: "2rem", marginBottom: "10px" }}>
                  {languageName}
                </h2>
                <p className="card-text text-muted text-wrap" style={{ fontSize: "1.2rem", marginBottom: "15px" }}>
                  {description}
                </p>
                <Link
                  to={`/dashboard/admin/update-languageName/${params.lang}`}
                  className="btn btn-outline-primary mx-3 mb-3"
                  style={{ padding: "10px 20px", fontSize: "1rem", borderRadius: "8px" }}
                >
                  Edit Language
                </Link>
              </div>
            </div>


            <div className=" col-12 row">
              <div className=" col-sm-10 mb-3">
                <Link to={`/dashboard/admin/add-notes/${params.lang}`} className="btn btn-sm btn-success mb-3">
                  Add Notes
                </Link>
                <div className="table-responsive">
                  <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                      <tr>
                        <th className="row-light text-center" colSpan="4">Notes</th>
                      </tr>
                      <tr>
                        <th>#</th>
                        <th>Notes Title</th>
                        <th>Sub titles</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {notes?.length > 0 ? (
                        notes.map((note, index) => (
                          <tr key={note._id}>
                            <td>{index + 1}</td>
                            <td>{note.notestitle || "N/A"}</td>
                            <td>
                              {note.subtitle && Array.isArray(note.subtitle) ? (
                                <ul style={{ listStyleType: "square", paddingLeft: "20px" }}>
                                  {note.subtitle.map((sub, idx) => (
                                    <li
                                      key={idx}
                                      style={{
                                        margin: "5px 0",
                                        backgroundColor: "#f0f4f8",
                                        padding: "8px",
                                        borderRadius: "5px",
                                        border: "1px solid #ddd",
                                      }}
                                    >
                                      {sub}
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <div
                                  style={{
                                    padding: "5px",
                                    backgroundColor: "#f8f9fa",
                                    borderRadius: "5px",
                                    border: "1px solid #ddd",
                                  }}
                                >
                                  {note.subtitle || "N/A"}
                                </div>
                              )}
                            </td>
                            <td>
                              <Link to={`/dashboard/admin/update-notes/${params.lang}/${note._id}`} className="btn btn-sm btn-success mx-2">
                                <i className="bi bi-pencil"></i> Edit
                              </Link>
                              <a
                                className="btn btn-sm btn-light mx-2"
                                onClick={() => handleDeleteNotes(note._id)}
                              >
                                <i className="bi bi-trash"></i> Delete
                              </a>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="text-center">No Notes available.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="col-sm-10 mb-3">
                <Link to={`/dashboard/admin/add-languageMocktest/${params.lang}`} className="btn btn-sm btn-success mb-3">
                  Add Mock Test
                </Link>
                <div className="table-responsive">
                  <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                      <tr>
                        <th className="row-light text-center" colSpan="3">Mock Test</th>
                      </tr>
                      <tr>
                        <th>#</th>
                        <th>Mock Test Name</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockTest?.length > 0 ? (
                        mockTest.map((mt, index) => (
                          <tr key={mt.id || index}>
                            <td>{index + 1}</td>
                            <td>{mt.testName || "N/A"}</td>
                            <td>
                              <Link to={`/dashboard/admin/update-languageMocktest/${params.lang}/${mt._id}`} className="btn btn-sm btn-success mx-2">
                                <i className="bi bi-pencil"></i> Edit
                              </Link>
                              <a
                                className="btn btn-sm btn-light mx-2"
                                onClick={() => handleDeleteMockTest(mt._id)}
                              >
                                <i className="bi bi-trash"></i> Delete
                              </a>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3" className="text-center">No mock test available.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </Layout >)
}


export default UpdateLanguageDetails