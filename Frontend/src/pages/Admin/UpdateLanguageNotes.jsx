import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import AdminMenu from "../../Components/Layout/AdminMenu";
import '../../Styles/FormStyle.css';

const UpdateLanguageNotes = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [languageName, setLanguageName] = useState("");
    const [mainImage, setMainImage] = useState("");
    const [notestitle, setNotesTitle] = useState("");
    const [subtitles, setSubtitles] = useState([{ subtitle: "", description: "", image: null }]);
    const [loading, setLoading] = useState(false);

    // Get all Languages
    const getSingleLanguage = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.SNOWPACK_PUBLIC_API}/language/get-single-language/${params.lang}`);
            setLanguageName(data.language.languageName);
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong in getting the language");
        }
    };

    useEffect(() => {
        getSingleLanguage();
    }, []);


    // Get Single notes
    const getSingleNotes = async () => {
        try {
            const { data } = await axios.get(
                `${import.meta.env.SNOWPACK_PUBLIC_API}/language-notes/get-single-notes/${params.notes}`
            );
            setNotesTitle(data.note.notestitle);

            const formattedSubtitles = data.note.subtitle.map((sub, index) => ({
                subtitle: sub,
                description: data.note.description[index] || "",
                image: null,
            }));
            setSubtitles(formattedSubtitles);

        } catch (error) {
            console.error(error);
            toast.error("Something went wrong in getting the notes");
        }
    };

    useEffect(() => {
        getSingleNotes();
    }, []);

    // Handle main image change
    const handleMainImageChange = (e) => {
        setMainImage(e.target.files[0]);
    };

    // Handle subtitle changes (Title, Description)
    const handleSubtitleChange = (index, field, value) => {
        const newSubtitles = [...subtitles];
        newSubtitles[index][field] = value;
        setSubtitles(newSubtitles);
    };

    // Add Subtitle Field
    const handleAddSubtitle = () => {
        setSubtitles([...subtitles, { subtitle: "", description: "", image: null }]);
    };

    // Remove Last Subtitle Field
    const handleRemoveSubtitle = () => {
        if (subtitles.length > 1) {
            setSubtitles(subtitles.slice(0, -1));
        } else {
            toast.error("At least one subtitle is required");
        }
    };


    // Handle Image Change
    const handleSubtitleImageChange = (index, file) => {
        const newSubtitles = [...subtitles];
        newSubtitles[index].image = file;
        setSubtitles(newSubtitles);
    };


    // Update Notes
    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("notestitle", notestitle);

            if (mainImage) {
                formData.append("mainImage", mainImage);
            }

            // Subtitles and their images
            subtitles.forEach((sub, index) => {
                formData.append(`subtitle[${index}]`, sub.subtitle);
                formData.append(`description[${index}]`, sub.description);
                if (sub.image) {
                    formData.append(`subImages`, sub.image);
                }
            });

            const { data } = await axios.put(
                `${import.meta.env.SNOWPACK_PUBLIC_API}/language-notes/update-languageNotes/${params.lang}/${params.notes}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (data?.success) {
                toast.success("Notes Updated Successfully");
                navigate(`/dashboard/admin/get-language/${params.lang}`);
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
        <Layout title={"Dashboard - Update Notes"}>
            <div className="container-fluid pt-3">
                <div className="row mt-3">
                    <div className="col-lg-4 col-md-3 mb-3">
                        <AdminMenu />
                    </div>
                    <div className="col-lg-8 col-md-9 mb-3">
                        <div className="admin-form-container">
                            <form onSubmit={handleUpdate}>
                                <h1>Update Notes</h1>
                                <div className="mb-3">
                                    <label>Language Name</label>
                                    <input
                                        value={languageName}
                                        className="form-control"
                                        readOnly
                                    />
                                </div>

                                <div className="mb-3">
                                    <label>Notes Title</label>
                                    <input
                                        value={notestitle}
                                        placeholder="Enter Notes Title"
                                        className="form-control"
                                        onChange={(e) => setNotesTitle(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="mainImage" className="form-label">Main Image:</label>
                                    {mainImage && (
                                        <img
                                            src={`${import.meta.env.SNOWPACK_PUBLIC_API}/${mainImage}`}
                                            alt="Main"
                                            className="img-thumbnail mb-2"
                                            style={{ width: "200px" }}
                                        />
                                    )}
                                    <input
                                        type="file"
                                        id="mainImage"
                                        className="form-control"
                                        onChange={handleMainImageChange}
                                    />
                                </div>


                                {subtitles.map((sub, index) => (
                                    <div key={index}>
                                        <div className="mb-3">
                                            <label>Subtitle {index + 1}</label>
                                            <input
                                                value={sub.subtitle}
                                                placeholder="Enter Subtitle"
                                                className="form-control"
                                                onChange={(e) => handleSubtitleChange(index, 'subtitle', e.target.value)}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label>Description</label>
                                            <textarea
                                                value={sub.description}
                                                placeholder="Enter Description"
                                                className="form-control"
                                                onChange={(e) => handleSubtitleChange(index, 'description', e.target.value)}
                                            ></textarea>
                                        </div>
                                    </div>
                                ))}


                                <div className="mb-3 text-center">
                                    <button
                                        type="button"
                                        className="btn btn-success w-25 me-2"
                                        onClick={handleAddSubtitle}
                                    >
                                        Add Subtitle
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-danger w-25"
                                        onClick={handleRemoveSubtitle}
                                        disabled={subtitles.length <= 1}
                                    >
                                        Remove Subtitle
                                    </button>
                                </div>


                                <div className="mb-3 text-center">
                                    <button className="btn btn-primary w-50" type="submit" disabled={loading}>
                                        {loading ? "Updating..." : "Update Notes"}
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

export default UpdateLanguageNotes