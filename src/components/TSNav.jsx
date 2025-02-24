import React, { useEffect, useState } from "react";
import "../CSS/STNav.css";
import { BsJustify } from "react-icons/bs";

function Teachernavbar({ OpenSidebar, onSemesterChange }) {
  const [selectedSemester, setSelectedSemester] = useState(() => {
    return localStorage.getItem("currentSemester") || "VI"; // Get last semester or default to VI
  });

  useEffect(() => {
    if (onSemesterChange && typeof onSemesterChange === "function") {
      onSemesterChange(selectedSemester); // ✅ Only call if function exists
    }
  }, [onSemesterChange,selectedSemester]);

  const handleSemesterChange = (semester) => {
    setSelectedSemester(semester);
    localStorage.setItem("currentSemester", semester); // Save to localStorage
  
    if (onSemesterChange && typeof onSemesterChange === "function") {
      onSemesterChange(semester); // ✅ Only call if it's a valid function
    } else {
      console.error("onSemesterChange is not defined or is not a function!");
    }
  };
  

  return (
    <header className="header">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>

      <div className="semester-buttons d-flex gap-2">
        {["I", "II", "III", "IV", "V", "VI"].map((sem) => (
          <button
            key={sem}
            className={`btn ${selectedSemester === sem ? "btn-success" : "btn-primary"}`}
            onClick={() => handleSemesterChange(sem)}
          >
            Semester {sem}
          </button>
        ))}
      </div>
    </header>
  );
}

export default Teachernavbar;
