import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { jsPDF } from "jspdf";
import { useFirebase } from "../context/Firebase";

function ShowApplication({ applicationData, student }) {
  console.log("Application Data:", student);
  const { reason, fromDate, toDate, description } = applicationData;
  const [error, setError] = useState("");
  const firebase = useFirebase();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSend = async (e) => {
    e.preventDefault();

    try {
      const doc = new jsPDF();

      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);

      doc.setLineWidth(0.5);
      doc.line(10, 10, 200, 10); 
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("Leave Application", 10, 20);

      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");

      doc.text("Date: " + new Date().toLocaleDateString(), 10, 30);

      doc.text("To,", 10, 40);
      doc.text("The Head of Department", 10, 50);
      doc.text(student?.branch || "", 10, 60); // Check if student.branch exists
      doc.text("Government Polytechnic Dehradun", 10, 70);

      doc.setLineWidth(0.2);
      doc.line(10, 80, 200, 80);

      doc.text("Subject: Leave Application", 10, 90);

      doc.text("Respected Sir/Madam,", 10, 100);
      doc.text(
        `I am writing to request leave from ${fromDate} to ${toDate} due to ${reason}.`,
        10,
        110
      );
      doc.text(description || "", 10, 120); // Check if description exists
      doc.text(
        "I kindly request your approval for this leave and assure you that I will complete any missed assignments or responsibilities upon my return.",
        10,
        130
      );

      doc.text("Thanking You,", 10, 140);
      doc.text("Your Name: " + (student?.name || "Your Name"), 10, 150); // Ensure name is a string
      doc.text("Roll No: " + (student?.id || "Your Roll No"), 10, 160); // Ensure ID is a string
      doc.text("Email: " + (student?.email || "Your Email"), 10, 170); // Ensure email is a string

      doc.setLineWidth(0.5);
      doc.line(10, 180, 200, 180); 

      const pdfBlob = doc.output("blob");

      const uploadResponse = await firebase.uploadPDF(pdfBlob);
      if (uploadResponse) {
        await firebase.putData(student.name, {
        title: "Leave Application",
        name: student.name,
        branch: student.branch,
        semester: student.semester,
        description: `Leave Application for  ${reason}`,
        pdfFile: uploadResponse.secure_url,
        isAccepted: false,
        reason: reason,
      });
    } else {
      console.error("Error uploading PDF:", uploadResponse);
      setError("An error occurred. Please try again.");
    }

      console.log("Cloudinary URL:", uploadResponse);
      alert("Leave Application Sent and PDF Uploaded Successfully!");
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    }
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
            <p>{student?.branch}</p>
            <p>Government Polytechnic Dehradun</p>
            <br />
            <p>
              <strong>Subject:</strong> Leave Application
            </p>
            <br />
            <p>Respected Sir/Madam,</p>
            <br />
            <p>
              I am writing to request leave from <strong>{fromDate}</strong> to{" "}
              <strong>{toDate}</strong> due to <strong>{reason}</strong>.
            </p>
            <p className="description-box">{description}</p>
            <p>
              I kindly request your approval for this leave and assure you that
              I will complete any missed assignments or responsibilities upon my
              return.
            </p>
            <div className="text-end mt-5">
              <p>Thanking You,</p>
              <p>
                <strong>Your Name: {student?.name}</strong>
              </p>
              <p>Roll No: {student?.id}</p>
              <p>Email: {student?.email}</p>
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
