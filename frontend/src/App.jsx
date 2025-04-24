import { ReactLenis } from "lenis/react";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import { Routes, Route } from "react-router-dom";
import UserProfileO from "./components/UserProfileO";
import CardPage from "./pages/CardPage";
import { SidebarDemo } from "./pages/SidebarC";

function App() {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.05,
        syncTouch: true,
      }}
    >
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/profile" element={<UserProfileO />} />
        <Route path="/card" element={<CardPage />} />
        <Route path="/side" Component={SidebarDemo} />
      </Routes>
    </ReactLenis>
  );
}

export default App;
