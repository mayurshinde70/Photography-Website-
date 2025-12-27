import React, { useState } from "react";
import axios from "axios";
import "../index.css";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    event_type: "",
    event_date: "",
    location: "",
    message: ""
  });

  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/contacts", form);
      setSent(true);
      setForm({
        name: "",
        email: "",
        phone: "",
        event_type: "",
        event_date: "",
        location: "",
        message: ""
      });
    } catch {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
  <section className="py-5 mt-5 contact-section">
    <div className="container-fluid px-3 px-md-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold display-6">
          <i className="bi bi-chat-dots-fill text-primary me-2"></i>
          Contact / Booking
        </h2>
        <p className="text-muted fs-5">
          Wedding & Pre-Wedding Photography Bookings
        </p>
      </div>

      <div className="row g-4 justify-content-center">

        {/* FORM */}
        <div className="col-lg-7">
          <div className="card border-0 shadow-lg h-100 glass-card">
            <div className="card-body p-4 p-md-5">
              <form onSubmit={handleSubmit}>
                <div className="row g-4">

                  {/** Name */}
                  <div className="col-md-6">
                    <input
                      className="form-control form-control-lg"
                      placeholder="Full Name *"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/** Email */}
                  <div className="col-md-6">
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      placeholder="Email Address *"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/** Phone */}
                  <div className="col-12">
                    <input
                      className="form-control form-control-lg"
                      placeholder="Phone Number"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>

                  {/** Event Type */}
                  <div className="col-md-6">
                    <select
                      className="form-select form-select-lg"
                      name="event_type"
                      value={form.event_type}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Event Type *</option>
                      <option>Wedding</option>
                      <option>Pre-Wedding</option>
                    </select>
                  </div>

                  {/** Event Date */}
                  <div className="col-md-6">
                    <input
                      type="date"
                      className="form-control form-control-lg"
                      name="event_date"
                      value={form.event_date}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/** Location */}
                  <div className="col-12">
                    <input
                      className="form-control form-control-lg"
                      placeholder="Event Location *"
                      name="location"
                      value={form.location}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/** Message */}
                  <div className="col-12">
                    <textarea
                      className="form-control"
                      rows="5"
                      placeholder="Tell us about your event..."
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                    />
                  </div>

                  {/** Submit */}
                  <div className="col-12 d-flex align-items-center">
                    <button
                      className="btn btn-primary btn-lg px-5"
                      disabled={loading}
                    >
                      {loading ? "Sending..." : "Send Enquiry"}
                    </button>

                    {sent && (
                      <span className="ms-3 text-success fw-semibold">
                        ✔ We’ll contact you soon
                      </span>
                    )}
                  </div>

                </div>
              </form>
            </div>
          </div>
        </div>

        {/* INFO */}
        <div className="col-lg-5">
          <div className="card border-0 shadow-lg h-100 glass-card">
            <div className="card-body p-4 p-md-5">
              <h4 className="fw-bold mb-4">Contact Details</h4>

              <p className="fs-5">
                <i className="bi bi-telephone-fill text-primary me-2"></i>
                +91-8975919810
              </p>

              <p className="fs-5">
                <i className="bi bi-envelope-fill text-primary me-2"></i>
            pratikkurhe235@gmail.com
              </p>

              <p className="fs-5">
                <i className="bi bi-geo-alt-fill text-primary me-2"></i>
                Aurangabad, Maharashtra
              </p>

              <a
                href="https://wa.me/918975919810"
                target="_blank"
                rel="noreferrer"
                className="btn btn-success btn-lg mt-4 w-100"
              >
                <i className="bi bi-whatsapp me-2"></i>
                WhatsApp Chat
              </a>

              <small className="text-muted d-block mt-4 text-center">
                ⏱ We reply within 24 hours
              </small>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
);

}
