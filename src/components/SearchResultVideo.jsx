import React from "react";
import { Link } from "react-router-dom";
import { abbreviateNumber } from "js-abbreviation-number";
import { BsFillCheckCircleFill } from "react-icons/bs";

import VideoLength from "../shared/VideoLength";

const SearchResultVideoCard = ({ video }) => {
    return (
        <Link to={`/video/${video?.videoId}`}>
            <div className="flex flex-col md:flex-row mb-8 md:mb-3 lg:hover:bg-black/[0.05] dark:lg:hover:bg-white/[0.1] rounded-xl md:p-4">
                {/* Thumbnail */}
                <div className="relative flex shrink-0 h-48 md:h-28 lg:h-40 xl:h-48 w-full md:w-48 lg:w-64 xl:w-80 rounded-xl bg-slate-800 overflow-hidden">
                    <img
                        className="h-full w-full object-cover"
                        src={video?.thumbnails?.[0]?.url || "/default-thumbnail.jpg"}
                        alt="Video Thumbnail"
                    />
                    {video?.lengthSeconds && (
                        <VideoLength time={video.lengthSeconds} />
                    )}
                </div>

                {/* Video Details */}
                <div className="flex flex-col ml-4 md:ml-6 mt-4 md:mt-0 overflow-hidden">
                    <span className="text-lg md:text-2xl font-semibold line-clamp-2 text-black dark:text-white">
                        {video?.title || "No title available"}
                    </span>
                    <span className="empty:hidden text-sm line-clamp-1 md:line-clamp-2 text-black/70 dark:text-white/70 md:pr-24 md:my-4">
                        {video?.descriptionSnippet || ""}
                    </span>

                    {/* Channel & Stats */}
                    <div className="hidden md:flex items-center">
                        {/* Channel Avatar */}
                        <div className="flex items-start mr-3">
                            <div className="flex h-9 w-9 rounded-full overflow-hidden">
                                <img
                                    className="h-full w-full object-cover"
                                    src={video?.author?.avatar?.[0]?.url || "/default-avatar.jpg"}
                                    alt="Channel Avatar"
                                />
                            </div>
                        </div>

                        {/* Channel Info */}
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold mt-2 text-black/70 dark:text-white/70 flex items-center">
                                {video?.author?.title || "Unknown Channel"}
                                {video?.author?.badges?.some(badge => badge.type === "VERIFIED_CHANNEL") && (
                                    <BsFillCheckCircleFill className="text-black/50 dark:text-white/50 text-[12px] lg:text-[10px] xl:text-[12px] ml-1" />
                                )}
                            </span>
                            <div className="flex text-sm font-semibold text-black/70 dark:text-white/70 truncate overflow-hidden">
                                <span>{`${abbreviateNumber(video?.stats?.views || 0, 2)} views`}</span>
                                <span className="flex text-[24px] leading-none font-bold text-black/70 dark:text-white/70 relative top-[-10px] mx-1">
                                    .
                                </span>
                                <span className="truncate">{video?.publishedTimeText || "Recently"}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default SearchResultVideoCard;
