import { useEffect, useState } from "react";
import Teachernavbar from "../components/TSNav";
import Teachersidebar from "../components/TeacherSidebar";
import TeacherBody from "../components/TeacherBody";
import Authentication from "../components/Authentication";
import AttendenceTable from "../components/AttendenceTable";
import TakeAttendance from "../components/TakeAttendance";
import { useLocation } from "react-router-dom";
function TeaBody() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [selectedAction, setSelectedAction] = useState("home");
  const attendanceCount = 100;
  const location = useLocation();
  const bra = location.state?.bra;

  // const [currentSemester, setCurrentSemester] = useState("VI");

  
  const [currentSemester, setCurrentSemester] = useState(() => {
    const savedSemester = localStorage.getItem("currentSemester");
    return savedSemester ? savedSemester : "V"; // Load from localStorage or default to "VI"
  });

  useEffect(() => {
    localStorage.setItem("currentSemester", currentSemester); // Save to localStorage
    localStorage.setItem("department", bra); // Save to localStorage
  }, [currentSemester]);
  

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  const renderContent = () => {
    switch (selectedAction) {
      case "home":
        return (
          <TeacherBody
            attendanceCount={attendanceCount}
            currentSemester={currentSemester}
            department={bra}
            
          />
        );
      case "Edit":
        return <Authentication />;
      case "SettingsPage":
        return <AttendenceTable />;
      case "TakeAttendance":
        return <TakeAttendance />;
      default:
        return <div>Select an action from the sidebar.</div>;
    }
  };

  return (
    <div className="grid-container">
      <Teachernavbar
        openSidebar={OpenSidebar}
        onSemesterChange={setCurrentSemester}
      />
      <Teachersidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
        setSelectedAction={setSelectedAction}
      />
      <div className="main-container">{renderContent()}</div>
    </div>
  );
}

export default TeaBody;
