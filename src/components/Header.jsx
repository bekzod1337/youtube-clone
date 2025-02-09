import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import ytLogo from "../images/yt-logo.png";
import ytLogoMobile from "../images/yt-logo-mobile.png";

import { SlMenu } from "react-icons/sl";
import { IoIosSearch } from "react-icons/io";
import { RiVideoAddLine } from "react-icons/ri";
import { FiBell } from "react-icons/fi";
import { CgClose } from "react-icons/cg";
import { Context } from "../context/ContextApi";
import Loader from "../shared/Loader";

const Header = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const { loading, mobileMenu, setMobileMenu } = useContext(Context);
    const navigate = useNavigate();

    const searchQueryHandler = (event) => {
        if (
            (event?.key === "Enter" || event === "searchButton") &&
            searchQuery?.length > 0
        ) {
            navigate(`/searchResult/${searchQuery}`);
        }
    };

    const mobileMenuToggle = () => {
        setMobileMenu(!mobileMenu);
    };

    const { pathname } = useLocation();
    const pageName = pathname?.split("/")?.filter(Boolean)?.[0];

    return (
        <div className="sticky top-0 z-10 flex flex-row items-center justify-between h-14 px-4 md:px-5 bg-white dark:bg-black border-b border-gray-300 dark:border-gray-700">
            {loading && <Loader />}

            {/* Logo & Mobile Menu */}
            <div className="flex h-5 items-center">
                {pageName !== "video" && (
                    <div
                        className="flex md:hidden md:mr-6 cursor-pointer items-center justify-center h-10 w-10 rounded-full hover:bg-gray-200 dark:hover:bg-[#303030]/[0.6]"
                        onClick={mobileMenuToggle}
                    >
                        {mobileMenu ? (
                            <CgClose className="text-black dark:text-white text-xl" />
                        ) : (
                            <SlMenu className="text-black dark:text-white text-xl" />
                        )}
                    </div>
                )}
                <Link to="/" className="flex h-5 items-center">
    {/* Katta ekranlar uchun logo */}
    <img
        className="h-full hidden md:block"
        src={ytLogo}
        alt="YouTube"
    />
    
    {/* Kichik ekranlar uchun mobil logo */}
    <img
        className="h-full md:hidden"
        src={ytLogoMobile}
        alt="YouTube Mobile"
    />
</Link>


            </div>

            {/* Search Input */}
            <div className="group flex items-center">
                <div className="flex h-8 md:h-10 md:ml-10 md:pl-5 border border-gray-400 dark:border-[#303030] rounded-l-3xl focus-within:border-blue-500">
                    <div className="w-10 items-center justify-center hidden group-focus-within:md:flex">
                        <IoIosSearch className="text-gray-600 dark:text-white text-xl" />
                    </div>
                    <input
                        type="text"
                        className="bg-transparent outline-none text-black dark:text-white pr-5 pl-5 md:pl-0 w-44 md:w-64 lg:w-[500px]"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyUp={searchQueryHandler}
                        placeholder="Search"
                        value={searchQuery}
                    />
                </div>
                <button
                    className="w-[40px] md:w-[60px] h-8 md:h-10 flex items-center justify-center border border-l-0 border-gray-400 dark:border-[#303030] rounded-r-3xl bg-gray-100 dark:bg-white/[0.1] hover:bg-gray-200 dark:hover:bg-white/[0.2]"
                    onClick={() => searchQueryHandler("searchButton")}
                >
                    <IoIosSearch className="text-gray-600 dark:text-white text-xl" />
                </button>
            </div>

            {/* User Icons */}
            <div className="flex items-center">
                <div className="hidden md:flex">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-200 dark:hover:bg-[#303030]/[0.6]">
                        <RiVideoAddLine className="text-black dark:text-white text-xl cursor-pointer" />
                    </div>
                    <div className="flex items-center justify-center ml-2 h-10 w-10 rounded-full hover:bg-gray-200 dark:hover:bg-[#303030]/[0.6]">
                        <FiBell className="text-black dark:text-white text-xl cursor-pointer" />
                    </div>
                </div>
                <div className="flex h-8 w-8 overflow-hidden rounded-full md:ml-4">
                    <img
                        src="https://bekzod1337.vercel.app/assets/rasm-Cg-Vg8FJ.jpg"
                        alt="User Avatar"
                        className="object-cover"
                    />
                </div>
            </div>
        </div>
    );
};

export default Header;
