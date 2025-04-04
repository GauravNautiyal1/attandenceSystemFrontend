import React, { useState, useEffect } from "react";
// import axios from "axios";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
} from "react-icons/bs";
import "../CSS/Body.css";
import { Link } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

function Teacherhome({ attendanceCount, currentSemester ,department}) {


    const { fetchAllStudents } = useFirebase();
    const [students, setStudents] = useState([]);
    const [studentCount,setStudentsCount]=useState([0]);

    useEffect(() => {
      const getStudents = async () => {
        try {
          const response = await fetchAllStudents(department, currentSemester);
          console.log("hellomoto",response.success," ",response.data)
          if (response.success) {
            setStudents(response.data);
            setStudentsCount(response.data.length)
          }
          else {
            console.error(response.message);
          }
        } catch (error) {
          console.error("Error fetching students:", error);
        } 
      };
  
      getStudents();
    }, [fetchAllStudents,currentSemester]);

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>DASHBOARD</h3>
      </div>

      <div className="main-cards">
        <div className="card">
          <Link
            to="/attendance"
            style={{ color: "#21252B", textDecoration: "none" }}
          >
            <div className="card-inner">
              <h3>ATTENDANCE</h3>
              <BsFillArchiveFill className="card_icon" />
            </div>
            <h1>{/* {attendanceCount}/{studentCount} */}</h1>
          </Link>
        </div>
        <div className="card">
          <Link
            to="/attendanceTable"
            style={{ color: "#21252B", textDecoration: "none" }}
          >
            <div className="card-inner">
              <h3>ATTENDANCE TABLE</h3>
              <BsFillGrid3X3GapFill className="card_icon" />
            </div>
          </Link>
        </div>
        <div className="card">
        <Link
            to="/students"
            state={{ semester: currentSemester, branch: "Information Technology", students: students  }}
            style={{ color: "#21252B", textDecoration: "none" }}
          >
            <div className="card-inner">
              <h3>STUDENTS</h3>
              <BsPeopleFill className="card_icon" />
            </div>
            <h1>{studentCount}</h1>
          </Link>
        </div>
      </div>

    </main>
  );
}

export default Teacherhome;
