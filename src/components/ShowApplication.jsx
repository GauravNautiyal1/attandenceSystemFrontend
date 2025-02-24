import React from "react";
import { Form, Button, Card, Container } from "react-bootstrap";

function ShowApplication({ applicationData }) {
  const { reason, fromDate, toDate, description } = applicationData;
  const handleSend = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("hello");
    alert("Leave Application Sent Successfully!");
  };
  return (
    <div className="profile-container">
      <header className="profile-header">
        <h1>Send Leave Application</h1>
      </header>
      <main className="container py-5 p-4">
        <Card.Body>
          <div className="application-content text-dark px-5">
            <p>
              <strong>Date:</strong> {new Date().toLocaleDateString()}
            </p>
            <p>
              <strong>To,</strong>
            </p>
            <p>The Head of Department</p>
            <p>Department</p>
            <p>Goverment Polytechnic Dehradun</p>
            <br />
            {/* <p>City, State</p> */}
            <p>
              <strong>Subject:</strong> Leave Application
            </p>
            <br />
            <p>Respected Sir/Madam,</p>
            <br />
            <p>
              I am writing to request leave from <strong>{fromDate}</strong> to{" "}
              <strong>{toDate}</strong> due to {" "}
              <strong>{reason}</strong>.
            </p>
            <p className="description-box">{description}</p>
            <p>I kindly request your approval
            for this leave and assure you that I will complete any missed
            assignments or responsibilities upon my return.</p>
            <div className="text-end mt-5">
              <p>Thanking You,</p>
              <p>
                <strong>Your Name</strong>
              </p>
              <p>Your Roll No/Employee ID</p>
            </div>
          </div>
          <div className="text-center">
            <Button variant="success" onClick={handleSend}>
              Send Application
            </Button>
          </div>
        </Card.Body>
      </main>
    </div>
  );
}

export default ShowApplication;
