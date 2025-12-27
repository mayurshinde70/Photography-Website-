import React, { useState } from "react";
import axios from "axios";
// import AdminSidebar from "./Sidebaritem";
import { useNavigate } from "react-router-dom";

export default function AdminAddWedding() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    short_desc: "",
    full_desc: "",
    cover_image: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function save() {
    if (!form.title || !form.short_desc) {
      alert("Title and short description required");
      return;
    }

    axios.post("http://localhost:5000/api/weddings", form)
      .then(() => {
        alert("Wedding added successfully");
        navigate("/admin/portfolio");
      });
  }

  return (
    <div className="d-flex">
      <AdminSidebar active="portfolio" />

      <div className="container py-5">
        <h3 className="fw-bold mb-4">Add New Wedding</h3>

        <div className="card p-4 shadow-sm" style={{ maxWidth: 700 }}>
          <input
            className="form-control mb-3"
            placeholder="Wedding Title (Rahul & Anjali)"
            name="title"
            value={form.title}
            onChange={handleChange}
          />

          <textarea
            className="form-control mb-3"
            rows="2"
            placeholder="Short Description (3–4 lines)"
            name="short_desc"
            value={form.short_desc}
            onChange={handleChange}
          />

          <textarea
            className="form-control mb-3"
            rows="4"
            placeholder="Full Wedding Story"
            name="full_desc"
            value={form.full_desc}
            onChange={handleChange}
          />

          <input
            className="form-control mb-3"
            placeholder="Cover Image URL"
            name="cover_image"
            value={form.cover_image}
            onChange={handleChange}
          />

          {form.cover_image && (
            <img
              src={form.cover_image}
              className="rounded mb-3"
              style={{ width: "100%", height: 250, objectFit: "cover" }}
            />
          )}

          <button className="btn btn-success" onClick={save}>
            Save Wedding
          </button>
        </div>
      </div>
    </div>
  );
}
