import { useEffect, useState } from "react";
import axios from "axios";

function compressImage(file, maxWidth = 800, quality = 0.6) {
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

export default function AdminGallery() {
  const [form, setForm] = useState({
    years: 10,
    clients: 1251,
    tagline: "",
    images: ["", "", ""],
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/gallery-stats")
      .then((res) => res.data && setForm(res.data));
  }, []);

  async function handleImage(e, index) {
    const file = e.target.files[0];
    if (!file) return;

    const img = await compressImage(file);
    const imgs = [...form.images];
    imgs[index] = img;

    setForm({ ...form, images: imgs });
  }

  async function save() {
    await axios.post("http://localhost:5000/api/gallery-stats", form);
    alert("Gallery section updated ✅");
  }

  const labels = ["Left Image", "Center Image", "Right Image"];

  return (
    <div className="container py-4">
      <h3 className="fw-bold mb-4">Gallery Section Admin</h3>

      <div className="row mb-4">
        <div className="col-md-4">
          <input
            className="form-control"
            type="number"
            placeholder="Years"
            value={form.years}
            onChange={(e) =>
              setForm({ ...form, years: e.target.value })
            }
          />
        </div>

        <div className="col-md-4">
          <input
            className="form-control"
            type="number"
            placeholder="Clients"
            value={form.clients}
            onChange={(e) =>
              setForm({ ...form, clients: e.target.value })
            }
          />
        </div>

        <div className="col-md-4">
          <input
            className="form-control"
            placeholder="Tagline"
            value={form.tagline}
            onChange={(e) =>
              setForm({ ...form, tagline: e.target.value })
            }
          />
        </div>
      </div>

      <div className="row">
        {[0, 1, 2].map((i) => (
          <div className="col-md-4 mb-4" key={i}>
            <label className="fw-semibold mb-2 d-block">
              {labels[i]}
            </label>

            {/* Image Preview */}
            {form.images[i] && (
              <img
                src={form.images[i]}
                alt={labels[i]}
                className="img-fluid rounded mb-2"
                style={{ maxHeight: 180, objectFit: "cover" }}
              />
            )}

            {/* Upload Input */}
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={(e) => handleImage(e, i)}
            />
          </div>
        ))}
      </div>

      <button className="btn btn-dark mt-3" onClick={save}>
        Save Gallery Section
      </button>
    </div>
  );
}
