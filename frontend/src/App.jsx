import { ReactLenis } from "lenis/react";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import { Routes, Route } from "react-router-dom";
import UserProfileO from "./components/UserProfileO";
import CardPage from "./pages/CardPage";
import { SidebarDemo } from "./pages/SidebarGithub";
import { SidebarDemoMongo } from "./pages/SidebarMongoDB";
import { SidebarDemoJIRA } from "./pages/SidebarJIRA";
import { SideBarGmailDemo } from "./pages/SideGmail";



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
        <Route path="/Github" Component={SidebarDemo} />
        <Route path="/MongoDb" Component={SidebarDemoMongo} />
        <Route path="/JIRA" Component={SidebarDemoJIRA} />
        <Route path="/Gmail" Component={SideBarGmailDemo} />
        
      </Routes>
    </ReactLenis>
  );
}

export default App;
