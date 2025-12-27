import { useEffect, useState } from "react";
import axios from "axios";

/* 🔹 image compress + base64 */
function compressImage(file, maxWidth = 900, quality = 0.7) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        let w = img.width;
        let h = img.height;
        if (w > maxWidth) {
          h = (h * maxWidth) / w;
          w = maxWidth;
        }

        canvas.width = w;
        canvas.height = h;
        ctx.drawImage(img, 0, 0, w, h);

        resolve(canvas.toDataURL("image/jpeg", quality));
      };
    };
  });
}

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    tag: "",
    desc: "",
    img: "",
    points: ""
  });

  useEffect(() => {
    load();
  }, []);

  function load() {
    axios.get("http://localhost:5000/api/services")
      .then(res => setServices(res.data));
  }

  function resetForm() {
    setForm({ title:"", tag:"", desc:"", img:"", points:"" });
    setEditId(null);
    setShowForm(false);
  }

  async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const base64 = await compressImage(file);
    setForm({ ...form, img: base64 });
  }

  function saveService() {
    const payload = {
      ...form,
      points: form.points.split(",").map(p => p.trim())
    };

    if (editId) {
      axios.put(`http://localhost:5000/api/services/${editId}`, payload)
        .then(() => {
          load();
          resetForm();
        });
    } else {
      axios.post("http://localhost:5000/api/services", payload)
        .then(() => {
          load();
          resetForm();
        });
    }
  }

  function editService(s) {
    setEditId(s.id);
    setShowForm(true);
    setForm({
      title: s.title,
      tag: s.tag,
      desc: s.desc,
      img: s.img,
      points: s.points.join(", ")
    });
  }

  function remove(id) {
    if (window.confirm("Remove this service?")) {
      axios.delete(`http://localhost:5000/api/services/${id}`)
        .then(load);
    }
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between mb-4">
        <h3 className="fw-bold">Services (Admin)</h3>
        <button
          className="btn btn-dark"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
        >
          + Add New Service
        </button>
      </div>

      {showForm && (
        <div className="card p-3 mb-4">
          <input
            className="form-control mb-2"
            placeholder="Title"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
          />

          <input
            className="form-control mb-2"
            placeholder="Tag"
            value={form.tag}
            onChange={e => setForm({ ...form, tag: e.target.value })}
          />

          <textarea
            className="form-control mb-2"
            placeholder="Description"
            value={form.desc}
            onChange={e => setForm({ ...form, desc: e.target.value })}
          />

          {/* 🔹 IMAGE URL OPTION */}
          <input
            className="form-control mb-2"
            placeholder="Image URL (optional)"
            value={form.img.startsWith("http") ? form.img : ""}
            onChange={e => setForm({ ...form, img: e.target.value })}
          />

          {/* 🔹 IMAGE UPLOAD OPTION */}
          <input
            type="file"
            className="form-control mb-2"
            accept="image/*"
            onChange={handleImageUpload}
          />

          {/* 🔹 IMAGE PREVIEW */}
          {form.img && (
            <img
              src={form.img}
              alt="preview"
              className="img-fluid rounded mb-2"
              style={{ maxHeight: 180, objectFit: "cover" }}
            />
          )}

          <input
            className="form-control mb-3"
            placeholder="Points (comma separated)"
            value={form.points}
            onChange={e => setForm({ ...form, points: e.target.value })}
          />

          <div className="d-flex gap-2">
            <button className="btn btn-success" onClick={saveService}>
              {editId ? "Update Service" : "Save Service"}
            </button>
            <button className="btn btn-secondary" onClick={resetForm}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="row g-4">
        {services.map(s => (
          <div className="col-md-4" key={s.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={s.img}
                className="card-img-top"
                style={{ height: 200, objectFit: "cover" }}
              />

              <div className="card-body">
                <span className="badge bg-warning text-dark mb-2">{s.tag}</span>
                <h5 className="fw-bold">{s.title}</h5>
                <p className="text-muted">{s.desc}</p>

                <ul className="small">
                  {s.points.map((p, i) => (
                    <li key={i}>✔ {p}</li>
                  ))}
                </ul>

                <div className="d-flex gap-2">
                  <button
                    className="btn btn-warning btn-sm w-50"
                    onClick={() => editService(s)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm w-50"
                    onClick={() => remove(s.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
