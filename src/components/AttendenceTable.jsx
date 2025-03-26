import React, { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/AttendanceTable.css";

const AttendanceTable = () => {
  const now = new Date();
  const [attendanceData, setAttendanceData] = useState([]);
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);

  useEffect(() => {
    // Calculate the number of days in the selected month
    const days = Array.from(
      { length: new Date(year, month, 0).getDate() },
      (_, i) => i + 1
    );
    setDaysInMonth(days);

    // Fetch attendance data from the API
    axios
      .get(`http://127.0.0.1:8000/recognition/api/monthly-attendance/${year}/${month}/`)
      // .get(`https://facedetection-2-blek.onrender.com/recognition/api/monthly-attendance/${year}/${month}/`)
      .then((response) => {
        setAttendanceData(response.data.attendance);
      })
      .catch((error) => {
        console.error("Error fetching attendance data:", error);
      });
  }, [year, month]);

  const handleMonthChange = (direction) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    let newMonth = month + direction;
    let newYear = year;

    if (newMonth > 12) {
      newMonth = 1;
      newYear += 1;
    } else if (newMonth < 1) {
      newMonth = 12;
      newYear -= 1;
    }

    if (newYear > currentYear || (newYear === currentYear && newMonth > currentMonth)) {
      return;
    }

    setMonth(newMonth);
    setYear(newYear);
  };

  return (
    <>
      <div className="attendanceContainer">
        <div className="navigation-buttons">
          <button className="nav-button" onClick={() => handleMonthChange(-1)}>
            &larr; Previous Month
          </button>
          <h1>Monthly Attendance - {year}-{month.toString().padStart(2, '0')}</h1>
          <button className="nav-button" onClick={() => handleMonthChange(1)}>
            Next Month &rarr;
          </button>
        </div>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th rowSpan="2">No.</th>
            <th rowSpan="2">Student Name</th>
            <th colSpan={daysInMonth.length}>Days</th>
          </tr>
          <tr>
            {daysInMonth.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((user, index) => (
            <tr key={user.name}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              {daysInMonth.map((day) => (
                <td
                  key={day}
                  style={{
                    backgroundColor: user.attendance?.[day] === "P" ? "#21bf21" : "white",
                    color: user.attendance?.[day] === "P" ? "white" : "black",
                  }}
                >
                  {user.attendance?.[day] || ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AttendanceTable;
