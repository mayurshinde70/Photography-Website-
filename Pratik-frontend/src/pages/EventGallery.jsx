import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function EventGallery() {
  const { eventId } = useParams();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    // API: GET /api/event/:eventId/photos
    fetch(`/api/event/${eventId}/photos`)
      .then(res => res.json())
      .then(data => setPhotos(data));
  }, [eventId]);

  return (
    <div className="container py-4 mt-5">
      <div className="text-center mb-4 mt-2">
        <h2 className="fw-bold">Wedding Gallery</h2>
        <p className="text-muted">Find your photos instantly</p>

        <Link
          to={`/event/${eventId}/faces`}
          className="btn btn-warning btn-lg mt-3"
        >
          Find My Photos 👤
        </Link>
      </div>

      <div className="row g-3">
        {photos.map((p, i) => (
          <div key={i} className="col-6 col-md-3">
            <img
              src={p.url}
              alt=""
              className="img-fluid rounded shadow-sm"
              style={{ objectFit: "cover", height: 180, width: "100%" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
