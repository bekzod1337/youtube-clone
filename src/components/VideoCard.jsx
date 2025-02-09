import React from "react";
import { abbreviateNumber } from "js-abbreviation-number";
import { Link } from "react-router-dom";
import { BsFillCheckCircleFill } from "react-icons/bs";
import VideoLength from "../shared/VideoLength";

function VideoCard({ video }) {
  return (
    <Link to={`/video/${video?.videoId}`}>
      <div className="flex flex-col mb-8">
        {/* Thumbnail */}
        <div className="relative h-48 md:h-40 md:rounded-xl overflow-hidden bg-gray-200 dark:bg-slate-800">
          <img
            className="h-full w-full object-cover"
            src={video?.thumbnails?.[0]?.url || "/default-thumbnail.jpg"}
            alt="Video Thumbnail"
          />
          {video?.lengthSeconds && <VideoLength time={video.lengthSeconds} />}
        </div>

        {/* Video Details */}
        <div className="flex text-black dark:text-white mt-3">
          {/* Avatar */}
          <div className="flex items-start">
            <div className="flex h-9 w-9 rounded-full overflow-hidden bg-gray-300 dark:bg-gray-700">
              <img
                src={video?.author?.avatar?.[0]?.url || "/default-avatar.jpg"}
                className="h-full w-full object-cover"
                alt="Channel Avatar"
              />
            </div>
          </div>

          {/* Video Info */}
          <div className="flex flex-col ml-3 overflow-hidden">
            <span className="text-sm font-bold line-clamp-2">
              {video?.title || "No title available"}
            </span>
            <span className="text-[12px] font-semibold mt-2 text-black/70 dark:text-white/70 flex items-center">
              {video?.author?.title || "Unknown Channel"}
              {video?.author?.badges?.some(badge => badge.type === "VERIFIED_CHANNEL") && (
                <BsFillCheckCircleFill className="text-black/50 dark:text-white/50 text-[12px] ml-1" />
              )}
            </span>
            <div className="flex text-[12px] font-semibold text-black/70 dark:text-white/70 truncate overflow-hidden">
              <span>{`${abbreviateNumber(video?.stats?.views || 0, 2)} views`}</span>
              <span className="flex text-[20px] leading-none font-bold text-black/70 dark:text-white/70 relative top-[-10px] mx-1">
                .
              </span>
              <span className="truncate">{video?.publishedTimeText || "Recently"}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default VideoCard;
