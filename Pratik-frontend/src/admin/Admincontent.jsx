import { useEffect, useState } from "react";
import axios from "axios";

function compressImage(file, maxWidth = 1200, quality = 0.7) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        // JPEG compression
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
    };
  });
}

export default function AdminContent() {
  const [image, setImage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/content")
      .then(res => {
        if (res.data?.hero?.bgImage) {
          setImage(res.data.hero.bgImage);
        }
      });
  }, []);

  async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    // Optional max size check
    if (file.size > 5 * 1024 * 1024) {
      alert("Image too large (max 5MB)");
      return;
    }

    const compressedImage = await compressImage(file, 1200, 0.7);
    setImage(compressedImage);
  }

  async function saveImage() {
    await axios.post("http://localhost:5000/api/content", {
      hero: { bgImage: image },
    });
    alert("Image uploaded successfully ✅");
  }

  return (
    <div className="container py-4">
      <h3 className="fw-bold mb-4">Website Image Manager</h3>

      <div className="col-md-4">
        <label className="form-label">Home Page Image</label>
        <input
          type="file"
          className="form-control"
          accept="image/*"
          onChange={handleImageUpload}
        />

        {image && (
          <img
            src={image}
            alt="Preview"
            className="img-fluid mt-3 rounded"
          />
        )}

        <button className="btn btn-primary mt-3" onClick={saveImage}>
          Save Image
        </button>
      </div>
    </div>
  );
}
