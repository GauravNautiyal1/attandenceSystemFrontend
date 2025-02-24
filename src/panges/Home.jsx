import "bootstrap/dist/css/bootstrap.min.css"
import Header from "../components/Header"
import Hero from "../components/Hero"
import Features from "../components/Features"
import CTA from "../components/CTA"
import Testimonials from "../components/Testimonials"
import Footer from "../components/Footer"
import "../CSS/Home.css"

function Home() {
  return (
    <div className="App">
      <Header/>
      <Hero />
      <Features />
      <CTA />
      <Testimonials />
      <Footer />
    </div>
  )
}

export default Home

