import React from "react";

export default function About() {
  return (
    <section className="py-5 mt-5" style={{ background: "#f5f5f5" }}>
      <div className="container-fluid px-4 px-md-5 mt-4">

        {/* SMALL TITLE */}
        <h6 className="text-uppercase fw-bold" style={{ color: "#c49853" }}>
          Pratik Films
        </h6>

        {/* MAIN HEADING */}
        <h2 className="fw-bold mb-4" style={{ fontSize: "42px" }}>
          About Us
        </h2>

        {/* GOLD UNDERLINE */}
        <div
          style={{
            width: "60px",
            height: "4px",
            background: "#c49853",
            marginBottom: "30px",
          }}
        ></div>

        <div className="row">

          {/* LEFT SIDE MAIN CONTENT */}
          <div className="col-md-7">

            <p className="text-muted" style={{ fontSize: "18px", lineHeight: "1.8" }}>
              Hey there, this is Pratik. Me and my team started this company in 2017 and
              have been running it with passion ever since. We never looked back.
              Today, Pratik Films is a trusted name for capturing the perfect moments
              of your life’s special events.
            </p>

            <p className="text-muted" style={{ fontSize: "18px", lineHeight: "1.8" }}>
              We specialize in professional cinematography, while also delivering top-quality
              traditional and candid photography. Our team is dedicated to preserving your
              memories with creativity, emotion, and cinematic storytelling.
            </p>

            {/* MISSION */}
            <h6 className="text-uppercase fw-bold mt-5" style={{ color: "#c49853" }}>
              Mission
            </h6>

            <p className="text-muted" style={{ fontSize: "18px", lineHeight: "1.8" }}>
              Providing amazing Photography and Videography services at an affordable cost,
              crafted with love, passion, and perfection.
            </p>

            {/* WHY CHOOSE US */}
            <h6 className="text-uppercase fw-bold mt-5" style={{ color: "#c49853" }}>
              Why Choose Us
            </h6>

            <p className="text-muted" style={{ fontSize: "18px", lineHeight: "1.8" }}>
              With over 1 million photos and more than 5000 hours of video experience,
              we proudly say that we are experts in photography and videography.
            </p>

            <p className="text-muted" style={{ fontSize: "18px", lineHeight: "1.8" }}>
              Candid and traditional photography are the best choices for weddings, and
              our team has experts in both styles to deliver perfect results.
            </p>

            <p className="text-muted" style={{ fontSize: "18px", lineHeight: "1.8" }}>
              Cinematic videography has also become extremely popular, and we offer all
              types of videography services to meet your needs.
            </p>
          </div>

          {/* RIGHT SIDE QUOTE */}
          <div className="col-md-5">
            <blockquote
              className="ps-3 mt-4"
              style={{
                borderLeft: "4px solid #c49853",
                fontStyle: "italic",
                color: "#666",
                fontSize: "20px",
                lineHeight: "1.8",
              }}
            >
              Let us bring a beautiful cinematic touch into your life by capturing amazing
              and unforgettable moments.
            </blockquote>
          </div>
        </div>

      </div>

     
    </section>
  );
}
