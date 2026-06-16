import About from "./About"
import Contact from "./components/Contact"
import Faq from "./components/Faq"
import Features from "./components/Features"
import Footer from "./components/Footer"
import Gallery from "./components/Gallery"
import Hero from "./components/Hero"
import Marquee from "./components/Marquee"
import Navbar from "./components/Navbar"
import Stats from "./components/Stats"
import Story from "./components/Story"
import Testimonials from "./components/Testimonials"
import Timeline from "./components/Timeline"

const App = () => {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Marquee />
      <Features />
      <Stats />
      <Story />
      <Gallery />
      <Timeline />
      <Testimonials />
      <Faq />
      <Contact />
      <Footer />
    </main>
  )
}

export default App