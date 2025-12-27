import React from "react";

const services = [
  {
    title: "Candid Photography",
    desc: "All our Wedding package has Candid Wedding Photographer included in Package.",
    img: "https://mangeshfilms.in/wp-content/uploads/2022/06/IMG_3697.jpg",
  },
  {
    title: "Cinematic Films",
    desc: "Every wedding package is included Cinematic wedding Film with trailer for wedding and Pre-wedding Shoot.",
    img: "https://mangeshfilms.in/wp-content/uploads/2022/06/IMG_3698.jpg",
    badge: "PREMIUM",
  },
  {
    title: "Traditional Photography",
    desc: "No wedding shoot can be completed, without traditional photographs to take group photos on stage after wedding with bride and grooms.",
    img: "https://mangeshfilms.in/wp-content/uploads/2022/06/IMG_3699.jpg",
  },
  {
    title: "Pre-Wedding Shoots",
    desc: "Book Pre-Wedding and Wedding package with us to get combo package discounts.",
    img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function Serviceshome() {
  return (
    <section id="services" className="py-5 bg-white">
      <div className="container-fluid px-4 px-md-5">
        <h2 className="text-center mb-2">Our Services</h2>
        <p
          className="text-center text-muted mb-4"
          style={{ maxWidth: 900, margin: "0 auto 28px" }}
        >
          Check our services for your wedding and Pre-Wedding requirements.
        </p>

        <div className="row g-4">
          {services.map((s, i) => (
            <div key={i} className="col-12 col-md-6">
              <article
                className="card border-0 shadow-sm h-100"
                style={{
                  transition: "transform .28s ease, box-shadow .28s ease",
                  overflow: "hidden",
                }}
                // card hover effect using inline : we add small inline script using onMouse...
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow = "0 24px 60px rgba(13,13,13,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.boxShadow = "";
                }}
              >
                <div className="row g-0 align-items-center">
                  {/* LEFT image for md+ */}
                  <div className="col-5 d-none d-md-block">
                    <div style={{ position: "relative", height: "100%" }}>
                      {s.badge && (
                        <span
                          className="badge"
                          style={{
                            position: "absolute",
                            top: 12,
                            left: 12,
                            zIndex: 5,
                            background: "#b8860b",
                            color: "#fff",
                            padding: "6px 10px",
                            borderRadius: 6,
                            fontWeight: 700,
                            fontSize: "0.75rem",
                          }}
                        >
                          {s.badge}
                        </span>
                      )}

                      <img
                        src={s.img}
                        alt={s.title}
                        loading="lazy"
                        className="img-fluid w-100"
                        style={{
                          height: 220,
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="col-12 col-md-7">
                    <div className="card-body">
                      {/* badge for small screens */}
                      {s.badge && (
                        <div className="d-block d-md-none mb-2">
                          <span
                            className="badge"
                            style={{
                              background: "#b8860b",
                              color: "#fff",
                              padding: "6px 8px",
                              borderRadius: 6,
                              fontWeight: 700,
                              fontSize: "0.75rem",
                            }}
                          >
                            {s.badge}
                          </span>
                        </div>
                      )}

                      <h5 className="card-title fw-bold mb-2">{s.title}</h5>
                      <p className="card-text text-muted" style={{ lineHeight: 1.6 }}>
                        {s.desc}
                      </p>

                      <div className="mt-3">
                        <a
                          href="#contact"
                          className="btn btn-sm btn-outline-secondary"
                          aria-label={`Read more about ${s.title}`}
                        >
                          READ MORE
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* IMAGE for small screens (below md) */}
                  <div className="col-12 d-block d-md-none">
                    <div className="p-3">
                      <img
                        src={s.img}
                        alt={s.title}
                        loading="lazy"
                        className="img-fluid rounded"
                        style={{ width: "100%", height: 230, objectFit: "cover", display: "block" }}
                      />
                    </div>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

      {/* small accessibility helper / focus style (inline style tag) */}
      <style>{`
        a.btn:focus {
          outline: 3px solid rgba(184,134,11,0.18);
          outline-offset: 3px;
        }
      `}</style>
    </section>
  );
}
