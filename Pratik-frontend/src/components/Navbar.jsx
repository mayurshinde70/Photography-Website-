import React from "react";
// import { Link } from "react-router-dom";
import PBKLogo from "./logo/pbk-logo"; // <-- component import here
//  import PBKLogo from '../../public/img/logomain.png';
import { Link, useLocation } from "react-router-dom";


export default function Navbar() {
   const location = useLocation();

  // ❌ Admin routes वर navbar render करू नको
  if (location.pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark fixed-top shadow-sm  "
      style={{
        backdropFilter: "blur(10px)",
        background: "rgba(0,0,0,0.45)",
        padding: "10px 0",
      }}
    >
      <div className="container">
        {/* BRAND LOGO */}
        <div className="d-flex align-items-center gap-2">
          <PBKLogo /> {/* <-- YOUR CUSTOM LOGO HERE */}
          <div className="d-flex flex-column">
            <span style={{ fontWeight: 700, fontSize: "18px", color: "white" }}>
              PBK FILMS
            </span>
            <small style={{ fontSize: "12px", color: "#f0e8e8ff" }}>
              Films & Photography
            </small>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* NAV MENU */}
        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav ms-auto gap-lg-4 gap-2 mt-3 mt-lg-0">
            <li className="nav-item">
              <Link className="nav-link premium-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link premium-link" to="/about">
                About
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link premium-link" to="/portfolio">
                Portfolio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link premium-link" to="/services">
                Services
              </Link>
            </li>

              <li className="nav-item">
              <Link className="nav-link premium-link" to="/client">
                Client Gallery 
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link premium-link" to="/packages">
                Packages
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link premium-link" to="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Hover Effect */}
      <style>
        {`
          .premium-link {
            position: relative;
            font-weight: 500;
            letter-spacing: 0.5px;
          }
          .premium-link::after {
            content: "";
            position: absolute;
            left: 0;
            bottom: -4px;
            width: 0%;
            height: 2px;
            background: #f6c453;
            transition: 0.3s ease;
          }
          .premium-link:hover::after {
            width: 100%;
          }
          .premium-link:hover {
            color: #f6c453 !important;
          }
        `}
      </style>
    </nav>
  );
}
