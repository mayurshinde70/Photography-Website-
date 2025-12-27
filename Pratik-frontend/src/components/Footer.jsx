import React from "react";
import { useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();

  // ❌ Admin pages वर footer hide
  if (location.pathname.startsWith("/admin")) return null;

  return (
    <footer className="site-footer">
      <div className="container-fluid px-4 px-md-5 text-center">
        <h5 className="footer-brand">PBK FILMS</h5>

        <p className="footer-tagline">
          Wedding Photography & Cinematic Storytelling
        </p>

        <div className="footer-socials">
          <a href="https://www.facebook.com/share/176fnyL5si/?mibextid=wwXIfr" target="_blank" rel="noreferrer">
            <i className="bi bi-facebook"></i>
          </a>
          <a
            href="https://www.instagram.com/pratik_kurhe_photography/"
            target="_blank"
            rel="noreferrer"
          >
            <i className="bi bi-instagram"></i>
          </a>
          <a href="https://wa.me/918975919810" target="_blank" rel="noreferrer">
            <i className="bi bi-whatsapp"></i>
          </a>
          <a href="https://pin.it/5awBSs2ZT" target="_blank" rel="noreferrer">
            <i className="bi bi-pinterest"></i>
          </a>
        </div>

        <div className="footer-divider"></div>

        <p className="footer-copy">
          © {new Date().getFullYear()} <strong>PBK Films</strong>. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
