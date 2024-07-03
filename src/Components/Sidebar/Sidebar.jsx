import React, { useState } from "react";
import './Sidebar.css';
import SidebarItem from "./SidebarItem";
import { useNavigate } from "react-router-dom";
import { HiMenuAlt3 } from "react-icons/hi";
import { RiProductHuntLine } from "react-icons/ri";
import menu from "../Data/Data";

const Sidebar = ({children}) => {
    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => setIsOpen(!isOpen);
    const navigate = useNavigate();
  
    const goHome = () => {
      navigate("/");
    };
    return (
        <div>
           <div className="sidebar" style={{ width: isOpen ? "15%" : "60px" }}>
        <div className="top_section">
          <div className="logo" style={{ display: isOpen ? "block" : "none" }}>
            <RiProductHuntLine
              size={35}
              style={{ cursor: "pointer" }}
              onClick={goHome}
            />
          </div>

          <div
            className="bars"
            style={{ marginLeft: isOpen ? "100px" : "0px" }}
          >
            <HiMenuAlt3 onClick={toggle} />
          </div>
        </div>
        {menu.map((item, index) => {
          return <SidebarItem key={index} item={item} isOpen={isOpen} />;
        })}
      </div>

      <main
        style={{
          paddingLeft: isOpen ? "15%" : "60px",
          transition: "all .5s",
        }}
      >
        {children}
      </main>
        </div>
    );
};

export default Sidebar;