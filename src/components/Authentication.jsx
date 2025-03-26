import { useState, useEffect } from 'react';
import { Button, Table } from "react-bootstrap";
import "../CSS/Authentication.css";
import { useFirebase } from '../context/Firebase';

export default function Authentication({ currentSemester, department }) {
  const [requests, setRequests] = useState([]);
  const { fetchUnauthorisedStudents, updateUserData } = useFirebase();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetchUnauthorisedStudents(department, currentSemester);
        if (response.success) {
          setRequests(response.data);
        }
      } catch (error) {
        console.error('Error fetching unauthorized students:', error);
      }
    };

    fetchRequests();
  }, [department, currentSemester, fetchUnauthorisedStudents]);


  const handleAccept = async (rollNo, uid, branch, semester) => {
    try {
      const response = await updateUserData(uid, true, rollNo, branch, semester);
      if (response.success) {
        setRequests(prevRequests => prevRequests.filter(request => request.uid !== uid));
      }
    } catch (error) {
      console.error('Error approving student:', error);
    }
  };

  const handleReject = async (rollNo, uid, branch, semester) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/delete_user/${uid}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });
  
      const result = await response.json();
      if (result.success) {
        setRequests(prevRequests => prevRequests.filter(request => request.uid !== uid));
        console.log(`User ${uid} has been deleted successfully.`);
      } else {
        console.error('Error deleting user:', result.error);
      }
    } catch (error) {
      console.error('Error rejecting student:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Pending Registrations</h1>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Roll No</th>
            <th>Branch</th>
            <th>Semester</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.length > 0 ? (
            requests.map((request) => (
              <tr key={request.uid}>
                <td>{request.name}</td>
                <td>{request.email}</td>
                <td>{request.rollNo}</td>
                <td>{request.branch}</td>
                <td>{request.semester}</td>
                <td>
                  <Button
                    variant="success"
                    onClick={() => handleAccept(request.rollNo, request.uid, request.branch, request.semester)}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleReject(request.rollNo, request.uid, request.branch, request.semester)}
                    className="ms-2"
                  >
                    Reject
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">No pending requests.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}
