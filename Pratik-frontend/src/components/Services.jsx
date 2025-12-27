import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/services")
      .then((res) => {
        setServices(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Services load error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-5 bg-light mt-5">
        <div className="container text-center">
          <h5>Loading services...</h5>
        </div>
      </section>
    );
  }

  return (
    <section className="py-5 bg-light mt-5">
      <div className="container-fluid px-4 px-md-5">

        {/* HEADER */}
        <div className="text-center mb-5">
          <div
            className="text-uppercase fw-semibold text-warning"
            style={{ letterSpacing: 2 }}
          >
            Pratik Films
          </div>
          <h1 className="display-5 fw-bold mt-2">
            Wedding Photography Services
          </h1>
          <p
            className="text-muted mt-3"
            style={{ maxWidth: 900, margin: "0 auto" }}
          >
            We specialise in professional wedding and pre-wedding photography,
            capturing timeless memories with elegance and creativity.
          </p>
        </div>

        {/* SERVICES GRID */}
        <div className="row g-4">
          {services.map((s, i) => (
            <div key={i} className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm">

                {/* IMAGE */}
                <div style={{ position: "relative" }}>
                  <img
                    src={s.img}
                    alt={s.title}
                    className="card-img-top"
                    style={{ height: 260, objectFit: "cover" }}
                  />
                  <span
                    className="badge bg-warning text-dark position-absolute"
                    style={{ top: 12, left: 12, fontWeight: 700 }}
                  >
                    {s.tag}
                  </span>
                </div>

                {/* CONTENT */}
                <div className="card-body d-flex flex-column">
                  <h5 className="fw-bold mb-2">{s.title}</h5>

                  <p className="text-muted" style={{ lineHeight: 1.7 }}>
                    {s.desc}
                  </p>

                  <ul className="list-unstyled text-muted mb-4">
                    {s.points?.map((p, idx) => (
                      <li key={idx}>✔ {p}</li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    <a
                      href="/contact"
                      className="btn btn-outline-dark btn-sm w-100"
                    >
                      Enquire Now
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
