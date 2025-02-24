import { Container, Row, Col } from "react-bootstrap"
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaEnvelope } from "react-icons/fa"

const Footer = () => {
  return (
    <footer id="contact" className="bg-dark text-white py-4">
      <Container>
        <Row>
          <Col md={6} className="mb-3 mb-md-0">
            <h5>FaceAttend</h5>
            <p>Revolutionizing attendance tracking with AI</p>
          </Col>
          <Col md={3} className="mb-3 mb-md-0">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#features" className="text-white">
                  Features
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-white">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#" className="text-white">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Contact Us</h5>
            <p>
              <FaEnvelope className="me-2" /> support@faceattend.com
            </p>
            <div className="social-icons">
              <a href="#" className="text-white me-3">
                <FaFacebookF />
              </a>
              <a href="#" className="text-white me-3">
                <FaTwitter />
              </a>
              <a href="#" className="text-white">
                <FaLinkedinIn />
              </a>
            </div>
          </Col>
        </Row>
        <hr className="mt-4" />
        <Row>
          <Col className="text-center">
            <p className="mb-0">&copy; 2023 FaceAttend. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer

