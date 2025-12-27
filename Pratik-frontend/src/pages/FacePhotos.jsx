import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function FacePhotos() {
  const { eventId, faceId } = useParams();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    // API: GET /api/event/:eventId/faces/:faceId
    fetch(`/api/event/${eventId}/faces/${faceId}`)
      .then(res => res.json())
      .then(data => setPhotos(data));
  }, [eventId, faceId]);

  return (
    <div className="container py-4 mt-5 ">
      <div className="d-flex justify-content-between align-items-center mb-3 mt-2">
        <h4 className="fw-bold">Your Photos</h4>

        <a
          href={`/api/event/${eventId}/faces/${faceId}/download`}
          className="btn btn-dark"
        >
          Download All ⬇️
        </a>
      </div>

      <div className="row g-3">
        {photos.map((p, i) => (
          <div key={i} className="col-6 col-md-3">
            <img
              src={p.url}
              alt=""
              className="img-fluid rounded shadow-sm"
              style={{ height: 180, objectFit: "cover", width: "100%" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
