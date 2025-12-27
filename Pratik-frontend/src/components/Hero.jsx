// src/components/Hero.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Hero() {
  const navigate = useNavigate();
  const [content, setContent] = useState(null);

  // 🔹 Backend मधून content fetch
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/content")
      .then((res) => {
        setContent(res.data);
      })
      .catch((err) => console.error("Hero content error:", err));
  }, []);

  function openOffers(mode) {
    navigate(`/packages?mode=${mode}`);
  }

  // 🔹 fallback image (जर backend data नसेल)
  const bg =
    content?.hero?.bgImage || "/img/3-DSC08537.jpg";

  return (
    <section
      className="hero-section d-flex align-items-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.35)), url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "120px 0",
        color: "white",
        minHeight: "90vh",
      }}
    >
      <div className="container-fluid px-4 px-md-5">
        <div className="row align-items-center">

          {/* LEFT SIDE */}
          <div className="col-md-5 mb-4">
            <h6 className="fw-bold text-uppercase opacity-75 mb-3">
              Premium Wedding Packages
            </h6>

            <div className="d-flex flex-column gap-3 mb-4">
              <button
                onClick={() => openOffers("wedding")}
                className="btn btn-primary btn-lg shadow-lg"
                style={{
                  borderRadius: "12px",
                  fontWeight: "700",
                  letterSpacing: "0.5px",
                }}
              >
                WEDDING PACKAGES
              </button>

              <button
                onClick={() => openOffers("pre")}
                className="btn btn-outline-light btn-lg shadow-lg"
                style={{
                  borderRadius: "12px",
                  fontWeight: "700",
                  backdropFilter: "blur(5px)",
                }}
              >
                PRE - WEDDING PACKAGES
              </button>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-md-7">
            <h1
              className="display-5 fw-bold mb-3"
              style={{ textShadow: "0px 4px 14px rgba(0,0,0,0.6)" }}
            >
              {content?.hero?.title ||
                "Professional Photography and Videography Packages."}
            </h1>

            <p
              className="lead"
              style={{
                fontSize: "1.2rem",
                maxWidth: "600px",
                opacity: "0.9",
              }}
            >
              {content?.hero?.subtitle ||
                "We capture your moments with cinematic storytelling and timeless visuals."}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
