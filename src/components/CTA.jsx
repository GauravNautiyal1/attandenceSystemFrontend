import { Container, Row, Col, Button } from "react-bootstrap"

const CTA = () => {
  return (
    <section className="cta bg-primary text-white py-5">
      <Container>
        <Row className="justify-content-center text-center">
          <Col md={8}>
            <h2 className="mb-4">Ready to Transform Your Attendance System?</h2>
            <p className="lead mb-4">Join hundreds of institutions already benefiting from our AI-powered solution.</p>
            <Button variant="light" size="lg" className="me-3">
              Get Started
            </Button>
            <Button variant="outline-light" size="lg">
              Request Demo
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default CTA

