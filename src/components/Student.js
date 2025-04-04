import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import * as XLSX from "xlsx";

const AllStudents = () => {
  const location = useLocation();
  const { semester, branch } = location.state || {
    semester: "N/A",
    branch: "N/A",
  };
  const students = location.state?.students || [];

  const handleExport = () => {
    const exportData = students.map((student, index) => ({
      "Roll No": student.id,
      Name: student.name,
      Email: student.email,
      Branch: student.branch,
      Semester: student.semester,
    }));

    
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Students");

    // Export the workbook to an Excel file
    XLSX.writeFile(wb, "students_data.xlsx");
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">All Students</h2>

      <Button variant="primary" onClick={handleExport} className="mb-3">
        Export to Excel
      </Button>

      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Roll No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Branch</th>
            <th>Semester</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student, index) => (
              <tr key={student.id}>
                <td>{index + 1}</td>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.branch}</td>
                <td>{student.semester}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No students found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default AllStudents;
