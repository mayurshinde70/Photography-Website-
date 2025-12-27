import React, { useEffect, useState } from "react";
import axios from "axios";

/* 🔹 Image Compress Helper */
function compressImage(file, quality = 0.6, maxWidth = 900) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        let w = img.width;
        let h = img.height;

        if (w > maxWidth) {
          h = (h * maxWidth) / w;
          w = maxWidth;
        }

        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        canvas.getContext("2d").drawImage(img, 0, 0, w, h);

        resolve(canvas.toDataURL("image/jpeg", quality));
      };
    };
    reader.readAsDataURL(file);
  });
}

export default function AdminOffers() {
  const [packages, setPackages] = useState([]);
  const [mode, setMode] = useState("pre");
  const [editPkg, setEditPkg] = useState(null);

  useEffect(() => {
    load();
  }, []);

  function load() {
    axios.get("http://localhost:5000/api/packages")
      .then(res => setPackages(res.data));
  }

  function remove(id) {
    if (window.confirm("Delete this package?")) {
      axios.delete(`http://localhost:5000/api/packages/${id}`)
        .then(load);
    }
  }

  function save() {
    const payload = { ...editPkg };

    if (editPkg.id) {
      axios.put(`http://localhost:5000/api/packages/${editPkg.id}`, payload)
        .then(load);
    } else {
      axios.post("http://localhost:5000/api/packages", payload)
        .then(load);
    }

    setEditPkg(null);
  }

  const list = packages.filter(p => p.category === mode);

  return (
    <section className="py-5">
      <div className="container">

        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold">Packages Admin</h3>
          <button
            className="btn btn-success"
            onClick={() =>
              setEditPkg({
                category: mode,
                title: "",
                price: "",
                img: "",
                recommended: false,
                bullets: []
              })
            }
          >
            + Add New Package
          </button>
        </div>

        {/* TOGGLE */}
        <div className="mb-4">
          <button
            className={`btn me-2 ${mode === "wedding" ? "btn-primary" : "btn-outline-secondary"}`}
            onClick={() => setMode("wedding")}
          >
            Wedding
          </button>
          <button
            className={`btn ${mode === "pre" ? "btn-primary" : "btn-outline-secondary"}`}
            onClick={() => setMode("pre")}
          >
            Pre-Wedding
          </button>
        </div>

        {/* CARDS */}
        <div className="row g-4">
          {list.map(p => (
            <div key={p.id} className="col-md-4">
              <div className="card h-100 shadow-sm">

                <div style={{ position: "relative", height: 220 }}>
                  <img
                    src={p.img}
                    className="w-100"
                    style={{ height: "100%", objectFit: "cover" }}
                    alt=""
                  />

                  {p.recommended && (
                    <span className="badge bg-warning text-dark position-absolute"
                      style={{ top: 12, left: 12 }}>
                      Recommended
                    </span>
                  )}
                </div>

                <div className="card-body">
                  <h5 className="fw-bold">{p.title}</h5>
                  <h6>{p.price}</h6>

                  <ul>
                    {p.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>

                  <div className="d-flex gap-2 mt-3">
                    <button
                      className="btn btn-warning btn-sm w-50"
                      onClick={() => setEditPkg(p)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm w-50"
                      onClick={() => remove(p.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* ADD / EDIT FORM */}
        {editPkg && (
          <div className="card p-4 mt-5">
            <h5 className="fw-bold mb-3">
              {editPkg.id ? "Edit Package" : "Add Package"}
            </h5>

            <input
              className="form-control mb-2"
              placeholder="Title"
              value={editPkg.title}
              onChange={e => setEditPkg({ ...editPkg, title: e.target.value })}
            />

            <input
              className="form-control mb-2"
              placeholder="Price"
              value={editPkg.price}
              onChange={e => setEditPkg({ ...editPkg, price: e.target.value })}
            />

            {/* IMAGE URL */}
            <input
              className="form-control mb-2"
              placeholder="Image URL (optional)"
              value={editPkg.img}
              onChange={e => setEditPkg({ ...editPkg, img: e.target.value })}
            />

            {/* IMAGE UPLOAD */}
            <input
              type="file"
              className="form-control mb-3"
              accept="image/*"
              onChange={async e => {
                const file = e.target.files[0];
                if (!file) return;
                const compressed = await compressImage(file);
                setEditPkg({ ...editPkg, img: compressed });
              }}
            />

            {/* IMAGE PREVIEW */}
            {editPkg.img && (
              <img
                src={editPkg.img}
                alt="preview"
                className="img-fluid rounded mb-3"
                style={{ maxHeight: 180, objectFit: "cover" }}
              />
            )}

            {/* POINTS */}
            <label className="fw-bold">Points</label>
            {editPkg.bullets.map((p, i) => (
              <div key={i} className="d-flex gap-2 mb-2">
                <input
                  className="form-control"
                  value={p}
                  onChange={e => {
                    const arr = [...editPkg.bullets];
                    arr[i] = e.target.value;
                    setEditPkg({ ...editPkg, bullets: arr });
                  }}
                />
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    const arr = editPkg.bullets.filter((_, idx) => idx !== i);
                    setEditPkg({ ...editPkg, bullets: arr });
                  }}
                >
                  ✕
                </button>
              </div>
            ))}

            <button
              className="btn btn-outline-primary mb-3"
              onClick={() =>
                setEditPkg({ ...editPkg, bullets: [...editPkg.bullets, ""] })
              }
            >
              + Add Point
            </button>

            {/* RECOMMENDED */}
            <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                checked={editPkg.recommended}
                onChange={e =>
                  setEditPkg({ ...editPkg, recommended: e.target.checked })
                }
              />
              <label className="form-check-label">Recommended</label>
            </div>

            <button className="btn btn-success" onClick={save}>
              Save Package
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
