import { Link } from "react-router-dom"
import Footer from "../layout/Footer"
import Navbar from "../layout/Navbar"

const Homepage = () => {
  return (
    <>
      <Navbar />
      <Link to="/login" className="text-2xl underline">Login</Link>
      <Footer />
    </>
  )
}

export default Homepage