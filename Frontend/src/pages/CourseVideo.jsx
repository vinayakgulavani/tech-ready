import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import "./../Styles/CourseVideo.css";

const CourseVideo = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [courseName, setCourseName] = useState("");
    const [videotitle, setVideotitle] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [topics, setTopics] = useState([]);
    const [showTitle, setShowTitle] = useState(false);

    // Get Single Video  
    const getSingleVideo = async () => {
        try {
            const { data } = await axios.get(
                `${import.meta.env.SNOWPACK_PUBLIC_API}/course-video/get-single-video/${params.video}`
            );

            if (data.Video) {
                setCourseName(data.Video.courseName);
                setVideotitle(data.Video.title);
                setVideoUrl(data.Video.videoUrl);
                setTopics(data.Video.topics);
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong while getting the video");
        }
    };

    useEffect(() => {
        getSingleVideo();
    }, []);

    const fullVideoUrl = videoUrl ? `${import.meta.env.SNOWPACK_PUBLIC_API}/${videoUrl}` : "";

    return (
        <Layout title={`Video - ${courseName}`}>
            <div className="course-video-container">
                {/* Video Section */}
                {fullVideoUrl ? (
                    <div
                        className="video-wrapper"
                        onMouseEnter={() => setShowTitle(true)}
                        onMouseLeave={() => setShowTitle(false)}
                        onClick={() => setShowTitle(!showTitle)}
                    >
                        {/* Video Title Overlay */}
                        {showTitle && <h2 className="video-overlay-title">{videotitle}</h2>}

                        <video
                            controls
                            disablePictureInPicture
                            controlsList="nodownload"
                            className="video-player"
                        >
                            <source src={fullVideoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                ) : (
                    <p className="text-danger text-center">Video Not Found</p>
                )}
            </div>

            <div className="topics-container">
                <h3>Topics : </h3>
                <ul>
                    {topics.length > 0 ? (
                        topics.map((topic, index) => <li key={index}>{topic}</li>)
                    ) : (
                        <p>No topics available.</p>
                    )}
                </ul>
            </div>
        </Layout>
    );
};

export default CourseVideo;
