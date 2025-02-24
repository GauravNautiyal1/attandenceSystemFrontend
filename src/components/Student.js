import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import { Table} from "react-bootstrap";
import { useLocation } from "react-router-dom";

const AllStudents = () => {
  // const { fetchAllStudents } = useFirebase();
  // const [students, setStudents] = useState([]);
  // const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { semester, branch} = location.state || {
    semester: "N/A",
    branch: "N/A",
  };
  const students = location.state?.students || {};

  // useEffect(() => {
  //   const getStudents = async () => {
  //     try {
  //       const response = await fetchAllStudents(branch, semester);
  //       if (response.success) {
  //         setStudents(response.data);
  //       }
  //       else {
  //         console.error(response.message);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching students:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   getStudents();
  // }, [fetchAllStudents, branch, semester,]);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">All Students</h2>

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
                <td colSpan="8" className="text-center">
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
