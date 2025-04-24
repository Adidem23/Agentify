import {SignedIn, SignedOut} from "@clerk/clerk-react";
import Navbar from "./Navbar";
import { HeroSection  } from "./HeroSection";
import Features from "./Features";
import Footer from "./Footer";
import Testimonials from "./Testimonial";

const AfterSign = () => {
  return (
    <>
    <SignedOut>
      <Navbar />
    </SignedOut>
    </>
  )
}

export default AfterSign