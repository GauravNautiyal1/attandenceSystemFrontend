import { Container, Row, Col, Card } from "react-bootstrap"

const testimonials = [
  {
    name: "Dr. Sarah Johnson",
    role: "Dean of Engineering",
    quote:
      "FaceAttend has revolutionized our attendance tracking process. It's accurate, efficient, and saves us hours every week.",
  },
  {
    name: "Prof. Michael Chen",
    role: "Computer Science Department",
    quote:
      "The face recognition technology is impressive. It's made taking attendance a breeze, even in large lecture halls.",
  },
  {
    name: "Emily Parker",
    role: "Student",
    quote:
      "I love being able to check my attendance record anytime. It's so convenient and helps me stay on top of my classes.",
  },
]

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-5 bg-light">
      <Container>
        <h2 className="text-center mb-5">What People Are Saying</h2>
        <Row>
          {testimonials.map((testimonial, index) => (
            <Col key={index} md={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Text className="mb-3">"{testimonial.quote}"</Card.Text>
                  <Card.Title>{testimonial.name}</Card.Title>
                  <Card.Subtitle className="text-muted">{testimonial.role}</Card.Subtitle>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default Testimonials

