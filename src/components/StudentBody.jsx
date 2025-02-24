import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsFillArchiveFill, BsFillPatchQuestionFill } from "react-icons/bs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
// import axios from "axios";
// import "./Home.css";

function StudentBody(props) {
  const rollNumber = props.Roll_No;
  const [data, setData] = useState([
    { name: "January", pv: 0, absent: 0 },
    { name: "February", pv: 0, absent: 0 },
    { name: "March", pv: 0, absent: 0 },
    { name: "April", pv: 0, absent: 0 },
    { name: "May", pv: 0, absent: 0 },
    { name: "June", pv: 0, absent: 0 },
    { name: "July", pv: 0, absent: 0 },
    { name: "August", pv: 0, absent: 0 },
    { name: "September", pv: 0, absent: 0 },
    { name: "October", pv: 0, absent: 0 },
    { name: "November", pv: 0, absent: 0 },
    { name: "December", pv: 0, absent: 0 },
  ]);

  // Fetch student attendance data
  const fetchAttendanceData = async () => {
    // try {
    //   const response = await axios.get(
    //     `http://127.0.0.1:8000/recognition/api/attendance_stu/${rollNumber}/2024/`
    //   );
    //   const fetchedData = response.data.monthly_attendance;

    //   const updatedMonthData = data.map((month) => {
    //     const attendance = fetchedData.find((item) => item.month === month.name);
    //     return {
    //       ...month,
    //       pv: attendance ? attendance.present : 0, // Default to 0 if no data found
    //     };
    //   });

    //   setData(updatedMonthData);
    // } catch (error) {
    //   console.error("Error fetching attendance data:", error);
    // }
  };


  useEffect(() => {
    fetchAttendanceData();
  }, []);

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>DASHBOARD</h3>
      </div>

      <div className="main-cards">
        <div className="card">
          <Link to={`/monthlyattendance/?rollNumber=${rollNumber}`} style={{ color: "#21252B", textDecoration: "none" }}>
            <div className="card-inner">
              <h3>MONTHLY ATTENDANCE</h3>
              <BsFillArchiveFill className="card_icon" />
            </div>
          </Link>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>COMING SOON</h3>
            <BsFillPatchQuestionFill className="card_icon" />
          </div>
        </div>
      </div>

      <div className="charts">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, "dataMax + 5"]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" name="Present" />
            <Bar dataKey="absent" fill="#ff7300" name="Absent" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default StudentBody;
