import React, { useState, useEffect } from "react";
// import axios from "axios";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
} from "react-icons/bs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import "../CSS/Body.css";
import { Link } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

function Teacherhome({ attendanceCount, currentSemester ,department}) {

  const [monthData, setMonthData] = useState([
    { name: "January", pv: 0 },
    { name: "February", pv: 0 },
    { name: "March", pv: 0 },
    { name: "April", pv: 0 },
    { name: "May", pv: 0 },
    { name: "June", pv: 0 },
    { name: "July", pv: 0 },
    { name: "August", pv: 0 },
    { name: "September", pv: 0 },
    { name: "October", pv: 0 },
    { name: "November", pv: 0 },
    { name: "December", pv: 0 },
  ]);

  const [weeklyData, setWeeklyData] = useState([
    { name: "Monday", pv: 0 },
    { name: "Tuesday", pv: 0 },
    { name: "Wednesday", pv: 0 },
    { name: "Thursday", pv: 0 },
    { name: "Friday", pv: 0 },
    { name: "Saturday", pv: 0 },
    { name: "Sunday", pv: 0 },
  ]);

  // Fetch monthly attendance data
  const fetchMonthlyAttendanceData = async () => {
    alert("hello");
  };

  // Fetch weekly attendance data
  const fetchWeeklyAttendanceData = async () => {
    alert(" fetchWeeklyAttendanceDat");
  };
  
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

      <div className="Tcharts">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={weeklyData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={monthData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default Teacherhome;
