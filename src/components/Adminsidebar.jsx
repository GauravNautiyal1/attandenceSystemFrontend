import React from "react";
import { useNavigate } from "react-router-dom";
import {
  BsGrid1X2Fill,
  BsPeopleFill,
  BsFillDatabaseFill,
  BsFillBandaidFill,
} from "react-icons/bs";
import "../CSS/Sidebar.css";
import { useFirebase } from "../context/Firebase";
function Adminsidebar({ openSidebarToggle, OpenSidebar, setSelectedAction }) {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await firebase.LogoutUser();
    localStorage.clear();

    navigate("/login");
  };

  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <p className="success">Atendify</p>
        </div>
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
          onClick={() => setSelectedAction("Edit")}
        >
          <BsGrid1X2Fill className="icon" /> Edit
        </li>

        <li
          className="sidebar-list-item"
          onClick={() => setSelectedAction("AddTeachers")}
        >
          <BsPeopleFill className="icon" /> Add Teachers
        </li>
        <li className="sidebar-list-item">
          <a href="http://127.0.0.1:8000/admin/">
            <BsFillDatabaseFill className="icon" /> Manage Database
          </a>
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

export default Adminsidebar;
