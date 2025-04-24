import React from "react";
import Footer from "../components/Footer.jsx";
import Testimonials from "../components/Testimonial.jsx";
import { HeroSection } from "../components/HeroSection.jsx";
import Navbar from "../components/Navbar.jsx";
import Features from "../components/Features.jsx";
import { SignedIn , SignedOut } from "@clerk/clerk-react";
import NewNav from "../components/NewNav.jsx";
import Workspace from "../components/Workspace.jsx";

function LandingPage() {
  return (
    <div>
      <SignedOut>
        <Navbar />
      </SignedOut>
      <SignedIn>
       <NewNav />
      </SignedIn>
      <HeroSection />
      <Features/>
      <Testimonials />
      <Workspace/>
      <Footer />
    </div>
  );
}

export default LandingPage;
