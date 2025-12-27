import React from "react";
import { useParams } from "react-router-dom";

const GALLERY = {
  "rahul-anjali": {
    title: "Rahul & Anjali Wedding",
    desc:
      "Rahul and Anjali’s wedding was a perfect blend of tradition, emotions and joyful celebrations. Every ritual was captured candidly with cinematic storytelling.",
    images: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1400",
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1400",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1400",
      "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=1400",
    ],
  },
};

export default function PortfolioDetails() {
  const { slug } = useParams();
  const data = GALLERY[slug];

  if (!data) return null;

  return (
    <section className="py-5 mt-5">
      <div className="container">

        {/* TITLE */}
        <div className="text-center mb-5">
          <h1 className="fw-bold">{data.title}</h1>
          <p className="text-muted mt-3" style={{ maxWidth: 850, margin: "auto" }}>
            {data.desc}
          </p>
        </div>

        {/* GALLERY */}
        <div className="row g-3">
          {data.images.map((img, i) => (
            <div key={i} className="col-12 col-md-4">
              <img
                src={img}
                className="img-fluid rounded shadow-sm gallery-img"
                style={{ height: 260, objectFit: "cover", width: "100%" }}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
