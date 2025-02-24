import { Container, Row, Col, Card } from "react-bootstrap"
import { FaUserCheck, FaBuilding, FaChartBar, FaUserLock, FaUserPlus } from "react-icons/fa"

const features = [
  {
    icon: <FaUserCheck />,
    title: "AI-Powered Face Recognition",
    description: "Mark attendance seamlessly with advanced face detection technology.",
  },
  {
    icon: <FaBuilding />,
    title: "Department & Year-Based Management",
    description: "Organize attendance records effortlessly for different departments and batches.",
  },
  {
    icon: <FaChartBar />,
    title: "Attendance Tracking & Export",
    description: "View and download attendance reports in Excel format.",
  },
  {
    icon: <FaUserLock />,
    title: "Student Self-Access",
    description: "Students can log in and check their own attendance records.",
  },
  {
    icon: <FaUserPlus />,
    title: "Secure Student Registration",
    description: "Easy sign-up via email or Google Authentication.",
  },
]

const Features = () => {
  return (
    <section id="features" className="py-5">
      <Container>
        <h2 className="text-center mb-5">Key Features</h2>
        <Row>
          {features.map((feature, index) => (
            <Col key={index} md={4} className="mb-4">
              <Card className="h-100 shadow-sm hover-card">
                <Card.Body className="d-flex flex-column align-items-center text-center">
                  <div className="feature-icon text-primary mb-3 fs-1">{feature.icon}</div>
                  <Card.Title>{feature.title}</Card.Title>
                  <Card.Text>{feature.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default Features

