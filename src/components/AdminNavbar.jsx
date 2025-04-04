import React, { useEffect, useState } from "react";
import "../CSS/STNav.css";
import { BsJustify } from "react-icons/bs";

function Teachernavbar({ OpenSidebar, onBranchChange }) {
  const [selectedBranch, setSelectedBranch] = useState(() => {
    return localStorage.getItem("currentBranch") || "VI"; // Get last semester or default to VI
  });

  useEffect(() => {
    if (onBranchChange && typeof onBranchChange === "function") {
      onBranchChange(selectedBranch); // ✅ Only call if function exists
    }
  }, [onBranchChange, selectedBranch]);

  const handleBranchChange = (branch) => {
   setSelectedBranch(branch);
    localStorage.setItem("currentBranch", branch); // Save to localStorage

    if (onBranchChange && typeof onBranchChange === "function") {
      onBranchChange(branch);
    } else {
      console.error("onBranchChange is not defined or is not a function!");
    }
  };

  return (
    <header className="header">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>

      <div className="semester-buttons d-flex gap-2">
        {[
          "Information Technology",
          "Computer Science Engineering",
          "Civil Engineering",
          "Electronics",
          "Mechanical",
          "Auto Mechanical",
        ].map((bra) => (
          <button
            key={bra}
            className={`btn ${
              selectedBranch === bra ? "btn-success" : "btn-primary"
            }`}
            onClick={() => handleBranchChange(bra)}
          >
            Semester {bra}
          </button>
        ))}
      </div>
    </header>
  );
}

export default Teachernavbar;
