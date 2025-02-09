import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { abbreviateNumber } from "js-abbreviation-number";

import { fetchDataFromApi } from "../utils/api";
import { Context } from "../context/ContextApi";
import SuggestionVideoCard from "./SuggestionVideoCard";

const VideoDetails = () => {
    const [video, setVideo] = useState(null);
    const [relatedVideos, setRelatedVideos] = useState(null);
    const { id } = useParams();
    const { setLoading } = useContext(Context);

    useEffect(() => {
        document.getElementById("root").classList.add("custom-h");
        fetchVideoDetails();
        fetchRelatedVideos();
    }, [id]);

    const fetchVideoDetails = async () => {
        try {
            setLoading(true);
            const res = await fetchDataFromApi(`video/details/?id=${id}`);
            setVideo(res);
        } catch (error) {
            console.error("Error fetching video details:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchRelatedVideos = async () => {
        try {
            setLoading(true);
            const res = await fetchDataFromApi(`video/related-contents/?id=${id}`);
            setRelatedVideos(res);
        } catch (error) {
            console.error("Error fetching related videos:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center flex-row h-[calc(100%-56px)] bg-white dark:bg-black">
            <div className="w-full max-w-[1280px] flex flex-col lg:flex-row">
                {/* Video Section */}
                <div className="flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg:py-6 overflow-y-auto">
                    <div className="h-[200px] md:h-[400px] lg:h-[400px] xl:h-[550px] ml-[-16px] lg:ml-0 mr-[-16px] lg:mr-0">
                        <ReactPlayer
                            url={`https://www.youtube.com/watch?v=${id}`}
                            controls
                            width="100%"
                            height="100%"
                            style={{ backgroundColor: "#000" }}
                            playing={true}
                        />
                    </div>

                    {/* Video Title */}
                    <div className="text-black dark:text-white font-bold text-sm md:text-xl mt-4 line-clamp-2">
                        {video?.title || "Untitled Video"}
                    </div>

                    {/* Video Meta Info */}
                    <div className="flex justify-between flex-col md:flex-row mt-4">
                        <div className="flex">
                            <div className="flex items-start">
                                <div className="flex h-11 w-11 rounded-full overflow-hidden bg-gray-300 dark:bg-gray-700">
                                    <img
                                        className="h-full w-full object-cover"
                                        src={video?.author?.avatar?.[0]?.url || "/default-avatar.jpg"}
                                        alt="Channel Avatar"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col ml-3">
                                <div className="text-black dark:text-white text-md font-semibold flex items-center">
                                    {video?.author?.title || "Unknown Channel"}
                                    {video?.author?.badges?.some(badge => badge.type === "VERIFIED_CHANNEL") && (
                                        <BsFillCheckCircleFill className="text-black/50 dark:text-white/50 text-[12px] ml-1" />
                                    )}
                                </div>
                                <div className="text-black/70 dark:text-white/70 text-sm">
                                    {video?.author?.stats?.subscribersText || "No subscribers info"}
                                </div>
                            </div>
                        </div>

                        {/* Likes & Views */}
                        <div className="flex text-black dark:text-white mt-4 md:mt-0">
                            <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-black/10 dark:bg-white/10">
                                <AiOutlineLike className="text-xl mr-2" />
                                {`${abbreviateNumber(video?.stats?.likes || 0, 2)} Likes`}
                            </div>
                            <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-black/10 dark:bg-white/10 ml-4">
                                {`${abbreviateNumber(video?.stats?.views || 0, 2)} Views`}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Videos */}
                <div className="flex flex-col py-6 px-4 overflow-y-auto lg:w-[350px] xl:w-[400px]">
                    {relatedVideos?.contents?.map((item, index) =>
                        item?.type === "video" ? (
                            <SuggestionVideoCard key={index} video={item.video} />
                        ) : null
                    )}
                </div>
            </div>
        </div>
    );
};

export default VideoDetails;
