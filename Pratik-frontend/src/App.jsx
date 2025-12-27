import React, { useEffect } from "react";
import axios from "axios";

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./components/About";
import Packages from "./components/Packages";
import Services from "./components/Services"; // --- IGNORE ---
import EventGallery from "./pages/EventGallery";
import FaceSelect from "./pages/FaceSelect";
import FacePhotos from "./pages/FacePhotos";
import Portfolio from "./pages/Portfolio";
import ShootGallery from "./pages/ShootGallery";
import ClientGallery from "./pages/ClientGallery";
import ScrollToTop from "./components/ScrollToTop";
// admin
import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import AdminContent from "./admin/Admincontent";
import AdminGallery from "./admin/AdminGallery";
import AdminServices from "./admin/AdminServices";
import AdminPackages from "./admin/AdminPackages";
import AdminPortfolio from "./admin/AdminPortfolio";
import AdminAddWedding from "./admin/AdminAddWedding";

export default function App() {
  useEffect(() => {
    axios.post("http://localhost:5000/api/admin/visits");
  }, []);
  return (
    <div className="app">
            <ScrollToTop /> {/* 👈 THIS FIXES THE ISSUE */}

      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/services" element={<Services />} />{" "}
        {/* --- IGNORE ---  */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/event/:eventId" element={<EventGallery />} />
        <Route path="/event/:eventId/faces" element={<FaceSelect />} />
        <Route path="/event/:eventId/faces/:faceId" element={<FacePhotos />} />
        <Route path="/portfolio" element={<Portfolio />} />
    <Route path="/portfolio/:slug" element={<ShootGallery />} />
            <Route path="/client" element={<ClientGallery />} />




                  {/* ADMIN */}
          

      </Routes>
      <Routes>
        
           <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="content" element={<AdminContent />} />
          <Route path="/admin/gallery-stats" element={<AdminGallery />} />
          <Route path="/admin/services" element={<AdminServices />} />
        <Route path="/admin/packages" element={<AdminPackages />} />
          <Route path="/admin/portfolio" element={<AdminPortfolio />} />
        <Route path="/admin/portfolio/add" element={<AdminAddWedding />} />

        </Route>
        </Routes>
   
      <Footer />
    </div>
  );
}
