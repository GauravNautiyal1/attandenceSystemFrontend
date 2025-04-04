import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/Firebase';
import { useNavigate } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';

function LeaveApplication({ currentSemester, department }) {
  console.log("helllo",currentSemester,department)

   const [requests, setRequests] = useState([]);
   const firebase= useFirebase();
   const navigate= useNavigate();

   useEffect(() => {
     const fetchRequests = async () => {
       try {
         const response = await firebase.fetchApplications(department, currentSemester);
         if (response.success) {
          console.log("response666",response.data)
           setRequests(response.data);
         }
       } catch (error) {
         console.error('Error fetching unauthorized students:', error);
       }
     };
 
     fetchRequests();
   }, [department, currentSemester, firebase.fetchApplications]);

 const handleAccept = async (uid,name) => {
  try {
    const response = await firebase.AcceptApplication(uid,name, true);//UID,name,value
    if (response.success) {
      setRequests(prevRequests => prevRequests.filter(request => request.uid !== uid));
    }
  } catch (error) {
    console.error('Error approving student:', error);
  }
};

const handleReject = async (uid,name) => {
  try {
    const response = await firebase.deleteApplicationData(uid,name);
    if (response.success) {
      setRequests(prevRequests => prevRequests.filter(request => request.uid !== uid));
    }
  } catch (error) {
    console.error('Error rejecting student:', error);
  }
};
const handleViewPDF = (PDFurl) => {
//  navigate("/view-pdf", { state: { pdfUrl:PDFurl} 
// });
window.open(PDFurl, "_blank");
};
  return (
   <div className="container mt-4">
   <h1 className="text-center mb-4">Leve Applications</h1>
   <Table striped bordered hover responsive>
     <thead>
       <tr>
         <th>Name</th>
         <th>Reason</th>
         <th>Action</th>
       </tr>
     </thead>
     <tbody>
       {requests.length > 0 ? (
        
         requests.map((request) => (
           <tr key={request.uid}>
             <td>{request.name}</td>
             <td>{request.reason}</td>
             <td>
               <Button
                 variant="success"
                 onClick={() => handleViewPDF(request.PDFurl)}
               >
                 View
               </Button>
               <Button
                 variant="success"
                 onClick={() => handleAccept(request.uid, request.name)}
               >
                 Accept
               </Button>
               <Button
                 variant="danger"
                 onClick={() => handleReject(request.uid, request.name)}
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
  )
}

export default LeaveApplication
