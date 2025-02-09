import React, { useContext, useEffect, useCallback } from "react";
import { Context } from "../context/ContextApi";
import LeftNav from "./LeftNav";
import VideoCard from "./VideoCard";

const Feed = () => {
    const { loading, searchResults } = useContext(Context);

    useEffect(() => {
        document.getElementById("root").classList.remove("custom-h");
    }, []);

    // Video renderingni optimallashtirish
    const renderVideos = useCallback(() => {
        if (!searchResults || searchResults.length === 0) {
            return <p className="text-center text-black dark:text-white">No videos found</p>;
        }

        return searchResults.map((item) =>
            item?.type === "video" ? (
                <VideoCard key={item?.video?.videoId} video={item?.video} />
            ) : null
        );
    }, [searchResults]);

    return (
        <div className="flex flex-row h-[calc(100%-56px)]">
            <LeftNav />
            <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-white dark:bg-black">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">
                    {loading
                        ? [...Array(12)].map((_, i) => (
                              <div key={i} className="animate-pulse bg-gray-300 dark:bg-gray-700 rounded-lg h-52"></div>
                          ))
                        : renderVideos()}
                </div>
            </div>
        </div>
    );
};

export default Feed;
