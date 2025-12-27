import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

export default function Packages({ mode: modeProp = null }) {
  const location = useLocation();
  const offersRef = useRef(null);

  const [modeLocal, setModeLocal] = useState("wedding");
  const [packages, setPackages] = useState([]);

  // 🔹 Fetch packages from backend
  useEffect(() => {
    axios.get("http://localhost:5000/api/packages")
      .then(res => setPackages(res.data))
      .catch(err => console.error(err));
  }, []);

  // mode sync
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const m = params.get("mode");
    setModeLocal(m === "pre" ? "pre" : "wedding");
  }, [location.search]);

  const filtered = packages.filter(p => p.category === modeLocal);

  return (
    <section id="offers" ref={offersRef} className="py-5 mt-5 bg-white">
      <div className="container-fluid px-4 px-md-5">

        {/* HEADER */}
        <div className="text-center mb-4">
          <div className="text-uppercase fw-semibold text-warning" style={{ letterSpacing: 2 }}>
            Pratik Films
          </div>
          <h2 className="display-6 fw-bold">Packages & Offers</h2>

          <div className="d-flex justify-content-center gap-2 mt-3">
            <button
              className={`btn btn-lg ${modeLocal === "wedding" ? "btn-primary" : "btn-outline-secondary"}`}
              onClick={() => setModeLocal("wedding")}
            >
              Wedding
            </button>
            <button
              className={`btn btn-lg ${modeLocal === "pre" ? "btn-primary" : "btn-outline-secondary"}`}
              onClick={() => setModeLocal("pre")}
            >
              Pre-Wedding
            </button>
          </div>
        </div>

        {/* PACKAGES */}
        <div className="row g-4 mt-3">
          {filtered.map(p => (
            <div key={p.id} className="col-md-4">
              <div className="card h-100 shadow-sm border-0">

                <div style={{ position: "relative", height: 220 }}>
                  <img src={p.img} className="w-100 h-100" style={{ objectFit: "cover" }} />

                  {p.recommended && (
                    <span className="badge bg-warning text-dark position-absolute"
                      style={{ top: 12, left: 12 }}>
                      Recommended
                    </span>
                  )}
                </div>

                <div className="card-body pt-4 d-flex flex-column">
                  <h5 className="fw-bold">{p.title}</h5>
                  <h6>{p.price}</h6>

                  <ul className="list-unstyled mb-3">
                    {p.bullets.map((b, i) => (
                      <li key={i}>✔ {b}</li>
                    ))}
                  </ul>

                  <div className="mt-auto d-flex gap-2">
                    <Link to="/contact" className="btn btn-outline-secondary btn-sm w-50">
                      Contact
                    </Link>
                    <a
                      href="https://wa.me/918975919810"
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-primary btn-sm w-50"
                    >
                      Book Now
                    </a>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
