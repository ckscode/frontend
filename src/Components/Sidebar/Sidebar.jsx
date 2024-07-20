import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import SidebarItem from "./SidebarItem";
import { useNavigate } from "react-router-dom";
import { HiMenuAlt3 } from "react-icons/hi";
import { RiProductHuntLine } from "react-icons/ri";
import menu from "../Data/Data";
import useScreenSize from "./useScreenSize";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();
  const isSmallScreen = useScreenSize();
  useEffect(() => {
    if (isSmallScreen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, []);
  const goHome = () => {
    navigate("/");
  };
  return (
    <div>
      <div className="sidebar" style={{ width: isOpen ? "230px" : "60px" }}>
        <div className="top_section">
          <div className="logo" style={{ display: isOpen ? "block" : "none" }}>
            <div className="inventory" onClick={goHome}>
              <h1>
                Inventory
                <span className="fw-light">App</span>
              </h1>
            </div>
            {/* <RiProductHuntLine
              size={35}
              style={{ cursor: "pointer" }}
              onClick={goHome}
            /> */}
          </div>

          <div className="bars" style={{ marginLeft: isOpen ? "10px" : "0px" }}>
            <HiMenuAlt3 onClick={toggle} />
          </div>
        </div>
        {menu.map((item, index) => {
          return <SidebarItem key={index} item={item} isOpen={isOpen} />;
        })}
      </div>

      <main
        style={{
          paddingLeft: isOpen ? "230px" : "60px",
          transition: "all .5s",
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
