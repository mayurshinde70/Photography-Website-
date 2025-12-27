import React, { useState } from "react";
import { photos } from "../data/photos";

export default function ClientGallery() {
  const images = photos["rohan-priya"];
  const [selected, setSelected] = useState([]);

  const toggle = img => {
    setSelected(prev =>
      prev.includes(img) ? prev.filter(i => i !== img) : [...prev, img]
    );
  };

  return (
    <div className="container py-5 mt-5">
      <h2 className="fw-bold text-center mb-3 mt-2" >Client Gallery</h2>
      <p className="text-center text-muted"> 
        Select photos for album ({selected.length} selected)
      </p>

      <div className="row g-3">
        {images.map((img, i) => (
          <div key={i} className="col-md-4 position-relative">
            <img
              src={img} 
              className="img-fluid rounded"
              onClick={() => toggle(img)}
              style={{ cursor: "pointer" }}
            />
            {selected.includes(img) && (
              <span className="badge bg-danger position-absolute top-0 end-0 m-2">
                ❤️
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        <button className="btn btn-success btn-lg">
          Submit Selection
        </button>
      </div>
    </div>
  );
}
