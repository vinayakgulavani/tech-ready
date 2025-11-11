import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import "../Styles/Notes.css";

const Notes = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [languageName, setLanguageName] = useState("");
    const [notestitle, setNotestitle] = useState("");
    const [subtitle, setSubtitle] = useState([]);
    const [description, setDescription] = useState([]);
    const [mainImage, setMainImage] = useState("");
    const [subImages, setSubImages] = useState([]);

    // Get single notes by ID and Language
    const getSingleNotes = async () => {
        try {
            const { data } = await axios.get(
                `${import.meta.env.SNOWPACK_PUBLIC_API}/language-notes/get-single-notes/${params.notes}`
            );

            setLanguageName(data.note.languageName);
            setNotestitle(data.note.notestitle);
            setSubtitle(data.note.subtitle);
            setDescription(data.note.description);
            setMainImage(data.note.mainImage);
            setSubImages(data.note.subImages);
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong in getting the notes");
        }
    };

    useEffect(() => {
        getSingleNotes();
    }, [params.lang, params.id]);

    return (
        <Layout title={`Notes - ${languageName}`}>
            <div id="notes-container" className="container-fluid mt-4">
                <div id="notes-card" className="card shadow-lg p-3 mb-4 bg-white rounded">
                    <div id="card-header" className="card-header text-center text-white">
                        <h2 className="text-dark">{notestitle}</h2>
                        {mainImage && (
                            <img
                                src={`${import.meta.env.SNOWPACK_PUBLIC_API}/${mainImage}`}
                                alt="Main"
                                id="main-image"
                                className="img-fluid rounded"
                            />
                        )}
                    </div>

                    {/* Displaying Subtitle, Description and Sub Images */}
                    {subtitle?.map((item, index) => (
                        <div key={index} id="subtitle-section" className="p-3">
                            <h3 className="subtitle-title" id="subtitle-title">{item}</h3>
                            <p className="subtitle-description text-justify">{description[index] || "Description not available"}</p>
                            {subImages[index]?.imageUrl && (
                                <img
                                    src={`${import.meta.env.SNOWPACK_PUBLIC_API}/${subImages[index].imageUrl}`}
                                    alt={`Sub ${index + 1}`}
                                    className="img-fluid rounded mb-3"
                                    id="subtitle-image"
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Notes;
