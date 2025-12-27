import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../index.css";

export default function Portfolio() {
  const navigate = useNavigate();
  const [weddings, setWeddings] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/weddings")
      .then(res => setWeddings(res.data));
  }, []);

  return (
    <section className="portfolio-section py-5 mt-5">
      <div className="container-fluid px-4 px-md-5">

        {/* HEADER */}
        <div className="text-center mb-5 animate-fade-up">
          <h1 className="display-5 fw-bold">Wedding Stories</h1>
          <p className="text-muted mt-3 mx-auto" style={{ maxWidth: 820 }}>
            Every wedding is a beautiful journey.
          </p>
        </div>

        {/* CARDS */}
        <div className="row g-4">
          {weddings.map((w, i) => (
            <div key={w.slug} className="col-12 col-md-6 col-lg-4">
              <div
                className="card portfolio-card-glass h-100 animate-fade-up"
                style={{ animationDelay: `${i * 0.2}s` }}
                onClick={() => navigate(`/portfolio/${w.slug}`)}
              >

                {/* ✅ FIXED IMAGE */}
                <div className="ratio ratio-4x3">
                  <img
                    src={w.cover_image}
                    alt={w.title}
                    className="w-100"
                    style={{
                      objectFit: "cover",
                      objectPosition: "center"
                    }}
                  />
                </div>

                <div className="card-body">
                  <h5 className="fw-bold">{w.title}</h5>
                  <p className="text-muted small">{w.short_desc}</p>
                  <span className="fw-semibold text-decoration-underline">
                    View More Photos →
                  </span>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
