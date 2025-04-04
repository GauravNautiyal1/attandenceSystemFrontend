import { useState, useEffect } from 'react';
import { Button, Table } from "react-bootstrap";
import "../CSS/Authentication.css";
import { useFirebase } from '../context/Firebase';

export default function TeacherDetail({ currentSemester, department }) {
  const [requests, setRequests] = useState([]);
  const { fetchAllTeacher, updateUserData ,deleteUserData} = useFirebase();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetchAllTeacher("Information Technology");
        if (response.success) {
          setRequests(response.data);
        }
      } catch (error) {
        console.error('Error fetching unauthorized students:', error);
      }
    };

    fetchRequests();
  }, [department, currentSemester]);


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
      const response = await deleteUserData(branch, semester ,rollNo,uid );
      if (response.success) {
        setRequests(prevRequests => prevRequests.filter(request => request.uid !== uid));
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
            <th>department</th>
            <th>Email</th>
            <th>departmentId</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.length > 0 ? (
            requests.map((request) => (
              <tr key={request.uid}>
                <td>{request.department}</td>
                <td>{request.email}</td>
                <td>{request.departmentId}</td>
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
