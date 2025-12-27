import React, { useEffect, useState } from "react";
import axios from "axios";

/* 🔹 helper: file → base64 */
function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
}

export default function AdminPortfolio() {
  const [weddings, setWeddings] = useState([]);
  const [editItem, setEditItem] = useState(null);

  // 🔥 Gallery states
  const [savedGallery, setSavedGallery] = useState([]); // DB images
  const [galleryImages, setGalleryImages] = useState([]); // new images
  const [galleryUrl, setGalleryUrl] = useState("");

  useEffect(() => {
    loadWeddings();
  }, []);

  /* ================= LOAD ================= */
  function loadWeddings() {
    axios.get("http://localhost:5000/api/weddings")
      .then(res => setWeddings(res.data));
  }

  function loadGalleryImages(weddingId) {
    axios
      .get(`http://localhost:5000/api/weddings/${weddingId}/photos`)
      .then(res => setSavedGallery(res.data))
      .catch(() => setSavedGallery([]));
  }

  /* ================= DELETE ================= */
  function removeWedding(id) {
    if (window.confirm("Delete this wedding?")) {
      axios.delete(`http://localhost:5000/api/weddings/${id}`)
        .then(loadWeddings);
    }
  }

  /* ================= SAVE WEDDING ================= */
  function saveWedding() {
    if (!editItem.title || !editItem.slug) {
      alert("Title & Slug required");
      return;
    }

    const api = editItem.id
      ? axios.put(`http://localhost:5000/api/weddings/${editItem.id}`, editItem)
      : axios.post("http://localhost:5000/api/weddings", editItem);

    api.then(() => {
      loadWeddings();
      setEditItem(null);
      setSavedGallery([]);
      setGalleryImages([]);
    });
  }

  /* ================= GALLERY ================= */

  // add URL image
  function addUrlImage() {
    if (!galleryUrl) return;
    setGalleryImages(prev => [...prev, galleryUrl]);
    setGalleryUrl("");
  }

  // add multiple files
  async function handleGalleryFiles(e) {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const images = await Promise.all(files.map(f => toBase64(f)));
    setGalleryImages(prev => [...prev, ...images]);
  }

  // save gallery to DB
  function saveGalleryPhotos() {
    if (!editItem?.id) {
      alert("Save wedding first");
      return;
    }

    if (galleryImages.length === 0) {
      alert("No images selected");
      return;
    }

    axios.post(
      `http://localhost:5000/api/weddings/${editItem.id}/photos`,
      { images: galleryImages }
    ).then(() => {
      alert("Gallery saved ✅");
      setGalleryImages([]);
      loadGalleryImages(editItem.id); // 🔥 reload DB images
    });
  }

  return (
    <section className="py-5 mt-4">
      <div className="container-fluid px-4">

        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold">Portfolio – Admin</h3>
          <button
            className="btn btn-success"
            onClick={() =>
              setEditItem({
                title: "",
                slug: "",
                short_desc: "",
                full_desc: "",
                cover_image: ""
              })
            }
          >
            + Add New Wedding
          </button>
        </div>

        {/* WEDDING CARDS */}
        <div className="row g-4">
          {weddings.map(w => (
            <div key={w.id} className="col-12 col-md-6 col-lg-4">
              <div className="card border-0 shadow-sm h-100">

                <div className="ratio ratio-4x3">
                  <img
                    src={w.cover_image}
                    style={{ objectFit: "cover" }}
                    alt={w.title}
                  />
                </div>

                <div className="card-body">
                  <h5 className="fw-bold">{w.title}</h5>
                  <p className="text-muted small">{w.short_desc}</p>

                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-warning btn-sm w-50"
                      onClick={() => {
                        setEditItem(w);
                        loadGalleryImages(w.id); // 🔥 load DB gallery
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm w-50"
                      onClick={() => removeWedding(w.id)}
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
        {editItem && (
          <div className="card p-4 mt-5">
            <h5 className="fw-bold mb-3">
              {editItem.id ? "Edit Wedding" : "Add Wedding"}
            </h5>

            <input
              className="form-control mb-2"
              placeholder="Wedding Title"
              value={editItem.title}
              onChange={e => setEditItem({ ...editItem, title: e.target.value })}
            />

            <input
              className="form-control mb-2"
              placeholder="Slug (rahul-anjali)"
              value={editItem.slug}
              onChange={e => setEditItem({ ...editItem, slug: e.target.value })}
            />

            <textarea
              className="form-control mb-2"
              placeholder="Short Description"
              value={editItem.short_desc}
              onChange={e => setEditItem({ ...editItem, short_desc: e.target.value })}
            />

            <textarea
              className="form-control mb-3"
              placeholder="Full Description"
              rows={4}
              value={editItem.full_desc}
              onChange={e => setEditItem({ ...editItem, full_desc: e.target.value })}
            />

            {/* COVER IMAGE */}
            <label className="fw-semibold">Cover Image (URL / Upload)</label>
            <input
              className="form-control mb-2"
              placeholder="Image URL"
              value={editItem.cover_image}
              onChange={e => setEditItem({ ...editItem, cover_image: e.target.value })}
            />

            <input
              type="file"
              className="form-control mb-3"
              accept="image/*"
              onChange={async e => {
                const file = e.target.files[0];
                if (!file) return;
                const base64 = await toBase64(file);
                setEditItem({ ...editItem, cover_image: base64 });
              }}
            />

            {editItem.cover_image && (
              <div className="ratio ratio-4x3 mb-3">
                <img src={editItem.cover_image} style={{ objectFit: "cover" }} alt="" />
              </div>
            )}

            <div className="d-flex gap-2 mb-4">
              <button className="btn btn-success" onClick={saveWedding}>
                Save Wedding
              </button>
              <button className="btn btn-secondary" onClick={() => setEditItem(null)}>
                Cancel
              </button>
            </div>

            {/* 🔥 GALLERY SECTION */}
            {editItem.id && (
              <>
                <hr />
                <h6 className="fw-bold mb-2">Gallery Photos (View More)</h6>

                {/* SAVED IMAGES */}
                {savedGallery.length > 0 && (
                  <div className="row g-3 mb-4">
                    {savedGallery.map(img => (
                      <div key={img.id} className="col-6 col-md-3">
                        <img
                          src={img.image_url}
                          className="img-fluid rounded shadow-sm"
                          style={{ height: 140, objectFit: "cover", width: "100%" }}
                          alt=""
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* ADD NEW */}
                <input
                  className="form-control mb-2"
                  placeholder="Paste image URL"
                  value={galleryUrl}
                  onChange={e => setGalleryUrl(e.target.value)}
                />

                <button
                  className="btn btn-outline-secondary btn-sm mb-3"
                  onClick={addUrlImage}
                >
                  + Add URL Image
                </button>

                <input
                  type="file"
                  className="form-control mb-3"
                  accept="image/*"
                  multiple
                  onChange={handleGalleryFiles}
                />

                {galleryImages.length > 0 && (
                  <div className="row g-3 mb-3">
                    {galleryImages.map((img, i) => (
                      <div key={i} className="col-6 col-md-3">
                        <img
                          src={img}
                          className="img-fluid rounded shadow-sm"
                          style={{ height: 140, objectFit: "cover", width: "100%" }}
                          alt=""
                        />
                      </div>
                    ))}
                  </div>
                )}

                <button
                  className="btn btn-primary w-100"
                  onClick={saveGalleryPhotos}
                >
                  💾 Save Gallery Photos
                </button>
              </>
            )}
          </div>
        )}

      </div>
    </section>
  );
}
