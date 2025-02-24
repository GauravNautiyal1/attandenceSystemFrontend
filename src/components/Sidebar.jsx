import React from "react";
import Image from "../Images/profilePicture.png";
// import { Link} from "react-router-dom";

import {
  BsGrid1X2Fill,
  BsFillGearFill,
  BsPeopleFill,
  BsFillBandaidFill,
} from "react-icons/bs";
import "../CSS/Sidebar.css";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";
function Sidebar({ openSidebarToggle, OpenSidebar, setSelectedAction }) {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await firebase.LogoutUser();
    navigate("/login");
  };
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      {/* opensidebartoggle? means if it is true than change the class name to sidebar-responsive */}
      <div className="sidebar-title">
        <div className="sidebar-brand">Atendify</div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        <li
          className="sidebar-list-item"
          onClick={() => setSelectedAction("home")}
        >
          <BsGrid1X2Fill className="icon" /> Dashboard
        </li>
        <li
          className="sidebar-list-item"
          onClick={() => setSelectedAction("profile")}
        >
          <BsPeopleFill className="icon" />
          Profile
        </li>
        <li
          className="sidebar-list-item"
          onClick={() => setSelectedAction("demo")}
        >
          <BsFillGearFill className="icon" /> Setting
        </li>
        <li
          className="sidebar-list-item"
          onClick={handleLogout}
          style={{ cursor: "pointer" }}
        >
          <BsFillBandaidFill className="icon" /> Logout
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
