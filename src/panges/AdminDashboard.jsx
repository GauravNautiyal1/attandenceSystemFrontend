import { useEffect, useState } from "react";
import Adminrnavbar from "../components/AdminNavbar";
import Adminsidebar from "../components/Adminsidebar.jsx";
import AdminBody from "../components/AdminBody.jsx";
import TeacherDetail from "../components/TeacherDetail.jsx";
import AttendenceTable from "../components/AttendenceTable";
// import TeacherSignIn from "./panges/TeacherSignIn";
import TakeAttendance from "../components/TakeAttendance";
import { useLocation } from "react-router-dom";
import FaceDetection from "../components/FaceRecognition";
import TeacherSignIn from "./TeacherSignIn.jsx";
// import styles from "../CSS/AdminDashboard.module.css";
function AdminDashboard() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [selectedAction, setSelectedAction] = useState("home");
  const attendanceCount = 100;
  const location = useLocation();
  // const branch = location.state?.branch;

  // const [currentBranch, setCurrentSemester] = useState("VI");

  const [currentBranch, setCurrentBranch] = useState(() => {
    const savedBranch = localStorage.getItem("currentBranch");
    return savedBranch ? savedBranch : "Information Technology"; 
  });

  useEffect(() => {
    localStorage.setItem("currentBranch", currentBranch);
    // localStorage.setItem("department", branch); // Save to localStorage
  }, [currentBranch]);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  const renderContent = () => {
    switch (selectedAction) {
      case "home":
        return (
          <AdminBody
            attendanceCount={attendanceCount}
            currentBranch={currentBranch}
            // department={branch}
          />
        );
      case "Edit":
        return (
          <TeacherDetail currentBranch={currentBranch} />
        );
      case "SettingsPage":
        return <AttendenceTable />;
      case "AddTeachers":
        return (
         <TeacherSignIn />
        );
      default:
        return <div>Select an action from the sidebar.</div>;
    }
  };

  return (
    <div className="grid-container">
      {/* <Adminrnavbar
        openSidebar={OpenSidebar}
        onBranchChange={setCurrentBranch}
      /> */}
      <Adminsidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
        setSelectedAction={setSelectedAction}
      />
      <div className="main-container">{renderContent()}</div>
    </div>
  );
}

export default AdminDashboard;
