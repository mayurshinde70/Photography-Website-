import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ShootGallery() {
  const { slug } = useParams();
  const [wedding, setWedding] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/weddings/slug/${slug}`)
      .then(res => {
        console.log("API RESPONSE 👉", res.data); // 🔥 DEBUG
        setWedding(res.data);
      })
      .catch(err => {
        console.error(err);
        alert("Wedding not found");
      });
  }, [slug]);

  if (!wedding) return null;

  return (
    <section className="container-fluid py-5 mt-5">
      <div className="container-fluid px-4 px-md-5">

        {/* TITLE */}
        <div className="text-center mb-5">
          <h1 className="fw-bold">{wedding.title}</h1>
          <p className="text-muted mt-3 mx-auto" style={{ maxWidth: 850 }}>
            {wedding.full_desc}
          </p>
        </div>

        {/* GALLERY */}
        <div className="row g-4">
          {(!wedding.photos || wedding.photos.length === 0) && (
            <p className="text-center text-muted">
              No photos added yet
            </p>
          )}

          {wedding.photos?.map(photo => (
            <div key={photo.id} className="col-12 col-sm-6 col-md-4">
              <div className="ratio ratio-4x5 shadow-sm rounded overflow-hidden">
                <img
                  src={photo.image_url}
                  alt="Wedding"
                  className="w-100 h-100"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center"
                  }}
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
