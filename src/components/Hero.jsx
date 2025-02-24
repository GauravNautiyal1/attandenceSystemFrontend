import { Container, Row, Col, Button } from "react-bootstrap";
import image from '../Images/demoImg.jpg'
import { useNavigate } from "react-router-dom";

const Hero = () => {
 const navigate = useNavigate();
  return (
    <section className="hero bg-primary text-white py-5">
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className="mb-4 mb-lg-0">
            <h1 className="display-4 fw-bold mb-3">
              Revolutionizing Attendance with AI-Powered Face Recognition
            </h1>
            <p className="lead mb-4">
              Simplify attendance tracking with our cutting-edge face detection
              system. Save time, increase accuracy, and focus on what matters
              most - education.
            </p>
            <Button variant="light" size="lg" className="me-3"
            onClick={() => navigate("/login")}
            >
              Get Started
            </Button>
            <Button variant="outline-light" size="lg">
              Learn More
            </Button>
          </Col>
          <Col lg={6}>
            <img
              src={image}
              alt="Face Recognition Illustration"
              className="img-fluid rounded shadow"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero;
