import React, { useEffect, useState } from "react";
import "../CSS/Body.css";
import Sidebar from "../components/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import StudentBody from "../components/StudentBody";
import Profile from "../components/Profile";
import LeaveRequest from "../components/LeaveRequest";
import ShowApplication from "../components/ShowApplication";
import { useFirebase } from "../context/Firebase";
import { useLocation } from "react-router-dom";

function Body() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [selectedAction, setSelectedAction] = useState("home");
  const [applicationData, setApplicationData] = useState(null);
  const { fetchSingleStudent } = useFirebase();
  const [student, setStudent] = useState([]);
  const location = useLocation();
  const studentdata = location.state?.studentdata || {};

  // const [studentCount, setStudentsCount] = useState([0]);

  console.log("this is student body :", applicationData);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  const renderContent = () => {
    switch (selectedAction) {
      case "home":
        return <StudentBody />;
      case "profile":
        return <Profile student={student} />;
      case "demo":
        return (
          <LeaveRequest
            setSelectedAction={setSelectedAction}
            setApplicationData={setApplicationData}
          />
        );
      case "none":
        return <ShowApplication applicationData={applicationData} student={student} />;
      default:
        return <div>Select an action from the sidebar.</div>;
    }
  };

  useEffect(() => {
    const getStudents = async () => {
      try {
        const response = await fetchSingleStudent(
          studentdata.Branch,
          studentdata.semester,
          studentdata.Roll_No,
        );
        if (response) {
          setStudent(response);
        } else {
          console.error("No student data found");
        }
      } catch (error) {
        console.error("Error fetching student:", error);
      }
    };

    getStudents();
  }, [fetchSingleStudent]);
  return (
    <div className="grid-container">
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
        setSelectedAction={setSelectedAction}
      />
      <div className="main-container">{renderContent()}</div>
    </div>
  );
}
export default Body;
