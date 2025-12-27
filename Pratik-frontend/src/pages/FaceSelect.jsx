import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function FaceSelect() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [faces, setFaces] = useState([]);

  useEffect(() => {
    // API: GET /api/event/:eventId/faces
    fetch(`/api/event/${eventId}/faces`)
      .then(res => res.json())
      .then(data => setFaces(data)); 
  }, [eventId]);

  return (
    <div className="container py-4 mt-5 ">
      <div className="text-center mb-4 mt-2">
        <h3 className="fw-bold">Select Your Face</h3>
        <p className="text-muted">Tap your face to see all your photos</p>
      </div>

      <div className="row g-3 justify-content-center">
        {faces.map(face => (
          <div
            key={face.faceId}
            className="col-4 col-md-2 text-center"
            onClick={() =>
              navigate(`/event/${eventId}/faces/${face.faceId}`)
            }
            style={{ cursor: "pointer" }}
          >
            <img
              src={face.thumbnail}
              alt=""
              className="rounded-circle shadow"
              style={{ width: 110, height: 110, objectFit: "cover" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
