import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import LeftNavMenuItem from "./LeftNavMenuItem";
import { categories } from "../utils/constants";
import { Context } from "../context/ContextApi";

function LeftNav() {
  const { selectedCategory, setSelectedCategory, mobileMenu } = useContext(Context);
  const navigate = useNavigate();

  const clickHandler = (name, type) => {
    if (type === "category" || type === "home") {
      setSelectedCategory(name);
      if (type === "home") navigate("/");
    }
  };

  return (
    <div
      className={`md:block w-[240px] overflow-y-auto h-full py-4 dark:bg-black bg-white absolute md:relative z-10 transition-all ${
        mobileMenu ? "translate-x-0" : "translate-x-[-240px] md:translate-x-0"
      }`}
    >
      <div className="flex px-5 flex-col">
        {categories.map((item) => (
          <React.Fragment key={item.name}>
            <LeftNavMenuItem
              text={item.type === "home" ? "Home" : item.name}
              icon={item.icon}
              action={() => {
                clickHandler(item.name, item.type);
              }}
              className={`${
                selectedCategory === item.name ? "bg-black/[0.15] dark:bg-white/[0.15]" : ""
              }`}
            />
            {item.divider && <hr className="my-5 border-black/[0.2] dark:border-white/[0.2]" />}
          </React.Fragment>
        ))}
        <hr className="my-5 border-black/[0.2] dark:border-white/[0.2]" />
        <div className="text-black dark:text-white/[0.5] text-[12px]">
          Clone by: Ansh Joshi
        </div>
      </div>
    </div>
  );
}

export default LeftNav;
