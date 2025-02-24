import { useState, useEffect } from 'react'
import { Button, Table } from "react-bootstrap"
import "../CSS/Authentication.css";
// import axios from 'axios';

export default function Authentication() {
  const [requests, setRequests] = useState([])

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/accounts/signup/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRequests(data); // Update the state with the fetched data
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchRequests();
  }, []);

  const getCSRFToken = () => {
    const csrfToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrftoken="));
    return csrfToken ? csrfToken.split("=")[1] : null;
  };
  

  const handleAccept = async (id) => {
    try {
      const csrfToken = getCSRFToken();
      if (!csrfToken) {
        throw new Error("CSRF token not found");
      }
  
      const response = await fetch(`http://127.0.0.1:8000/accounts/approve-signup/${id}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
      });
  
      if (!response.ok) {
        console.log(response)
        throw new Error("Failed to approve the request");
      }
  
      setRequests((prev) => prev.filter((req) => req.id !== id));
      console.log(`Accepted request for user with id: ${id}`);
    } catch (error) {
    }
  };
  
  const handleReject = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/accounts/signup/${id}/`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete the request');
      }

      // Remove the rejected request from the local state
      setRequests(prev => prev.filter(req => req.id !== id));
      console.log(`Rejected and deleted request for user with id: ${id}`);
      
    } catch (error) {
      console.error('There was a problem with the delete operation:', error);
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
            <th>Role</th>
            <th>Branch</th>
            <th>Semester</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.length > 0 ? requests.map((request) => (
            <tr key={request.id}>
              <td>{request.first_name}  {request.last_name}</td>
              <td>{request.Email}</td>
              <td>{request.Roll_No}</td>
              <td>{request.Branch}</td>
              <td>{request.semester}</td>
              <td>{request.Age}</td>
              <td>
                {/* <Button variant="success" onClick={() => handleAccept(request.id)}> */}
                <Button variant="success" onClick={() => handleAccept(request.id)} >
                  <a className="underline" href="http://127.0.0.1:8000/recognition/train_classifier/">
                  Accept
                  </a>
                </Button>
                <Button variant="danger" onClick={() => handleReject(request.id)}>
                  Reject
                </Button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="7" className="text-center">No pending requests.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}
