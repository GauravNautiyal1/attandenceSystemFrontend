// import React from 'react'
import React, { useState } from 'react';
import { Form, Button, Card, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function LeaveRequest({setSelectedAction,setApplicationData}) {
  const [formData, setFormData] = useState({
    reason: '',
    fromDate: '',
    toDate: '',
    description: ''
  });
  const navigate= useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    setApplicationData(formData)
    console.log("4565556",formData)
    // navigate('/preview', { state: { applicationData: formData } });
    setSelectedAction("none")
    
  };
  return (
   <div className="profile-container">
   <header className="profile-header">
     <h1>Send Leave Application</h1>
   </header>
   <main className="container py-5 p-4">
   <Card.Body className='profile-card shadow-lg'>
   <div className="row g-0 p-5">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="reason">
              <Form.Label>Reason for Leave</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="fromDate">
              <Form.Label>From Date</Form.Label>
              <Form.Control
                type="date"
                name="fromDate"
                value={formData.fromDate}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="toDate">
              <Form.Label>To Date</Form.Label>
              <Form.Control
                type="date"
                name="toDate"
                value={formData.toDate}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Detailed Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Explain your reason in detail..."
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <div className="text-center">
              <Button variant="success" type="submit">
                Submit Application
              </Button>
            </div>
          </Form>
          </div>
        </Card.Body>
    
   </main>

      
    </div>
  )
}

export default LeaveRequest



// import React, { useState } from 'react';
// import { Form, Button, Card, Container } from 'react-bootstrap';

// function LeaveRequest() {
//   const [formData, setFormData] = useState({
//     reason: '',
//     fromDate: '',
//     toDate: '',
//     description: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission here
//     console.log(formData);
//     alert('Leave Application Sent Successfully!');
//   };

//   return (
//     <Container className="py-5">
//       <Card className="shadow-lg">
//         <Card.Header className="bg-success text-white text-center">
//           <h2>Send Leave Application</h2>
//         </Card.Header>
//         <Card.Body>
//           <Form onSubmit={handleSubmit}>
//             <Form.Group className="mb-3" controlId="reason">
//               <Form.Label>Reason for Leave</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter reason"
//                 name="reason"
//                 value={formData.reason}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="fromDate">
//               <Form.Label>From Date</Form.Label>
//               <Form.Control
//                 type="date"
//                 name="fromDate"
//                 value={formData.fromDate}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="toDate">
//               <Form.Label>To Date</Form.Label>
//               <Form.Control
//                 type="date"
//                 name="toDate"
//                 value={formData.toDate}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="description">
//               <Form.Label>Detailed Description</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={5}
//                 placeholder="Explain your reason in detail..."
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>

//             <div className="text-center">
//               <Button variant="success" type="submit">
//                 Submit Application
//               </Button>
//             </div>
//           </Form>
//         </Card.Body>
//       </Card>
//     </Container>
//   );
// }

// export default LeaveRequest;
