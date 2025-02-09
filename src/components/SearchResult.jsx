import React, { useState, useEffect, useContext, useCallback } from "react";
import { useParams } from "react-router-dom";

import { fetchDataFromApi } from "../utils/api";
import { Context } from "../context/ContextApi";
import LeftNav from "./LeftNav";
import SearchResultVideo from "./SearchResultVideo";

const SearchResult = () => {
    const [result, setResult] = useState([]);
    const { searchQuery } = useParams();
    const { setLoading } = useContext(Context);

    const fetchSearchResults = useCallback(() => {
        setLoading(true);
        fetchDataFromApi(`search/?q=${searchQuery}`).then((res) => {
            setResult(res?.contents || []);
            setLoading(false);
        });
    }, [searchQuery, setLoading]);

    useEffect(() => {
        document.getElementById("root").classList.remove("custom-h");
        fetchSearchResults();
    }, [fetchSearchResults]);

    return (
        <div className="flex flex-row h-[calc(100%-56px)]">
            <LeftNav />
            <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-white dark:bg-black text-black dark:text-white">
                <div className="grid grid-cols-1 gap-2 p-5">
                    {result.length > 0 ? (
                        result
                            .filter((item) => item?.type === "video")
                            .map((item) => (
                                <SearchResultVideo
                                    key={item.video.videoId}
                                    video={item.video}
                                />
                            ))
                    ) : (
                        <p className="text-center text-lg mt-10">Natija topilmadi</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchResult;
