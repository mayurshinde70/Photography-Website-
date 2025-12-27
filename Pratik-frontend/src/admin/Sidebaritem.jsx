import React from "react";
import { useNavigate } from "react-router-dom";

function SidebarItem({ icon, label, path, active }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(path)}
      className={`d-flex align-items-center gap-3 px-3 py-2 rounded ${
        active ? "bg-primary text-white" : "text-light"
      }`}
      style={{ cursor: "pointer", fontWeight: 500 }}
    >
      <i className={`bi ${icon}`} style={{ fontSize: 18 }}></i>
      <span className="text-capitalize">{label}</span>
    </div>
  );
}

export default function AdminSidebar({ active }) {
  return (
    <>
      {/* DESKTOP */}
      <aside
        className="d-none d-lg-flex flex-column p-3 text-white"
        style={{
          width: 260,
          minHeight: "100vh",
          background: "linear-gradient(180deg,#020617,#0f172a)",
        }}
      >
        <SidebarContent active={active} />
      </aside>

      {/* MOBILE */}
      <div
        className="offcanvas offcanvas-start text-white"
        tabIndex="-1"
        id="adminSidebar"
        style={{ background: "linear-gradient(180deg,#020617,#0f172a)" }}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title fw-bold">PBK FILMS</h5>
          <button className="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
        </div>
        <div className="offcanvas-body">
          <SidebarContent active={active} mobile />
        </div>
      </div>
    </>
  );
}

/* 🔁 Shared Sidebar Content */
function SidebarContent({ active, mobile }) {
  const navigate = useNavigate();

  const go = (path) => {
    navigate(path);
    if (mobile) {
      document.querySelector(".offcanvas")?.classList.remove("show");
      document.body.classList.remove("offcanvas-backdrop");
    }
  };

  return (
    <>
      <div className="text-center mb-4">
        <h4 className="fw-bold mb-0">PBK FILMS</h4>
        <small className="text-secondary">Admin Panel</small>
      </div>

      <div className="d-flex flex-column gap-2">
        <SidebarItem icon="bi-speedometer2" label="dashboard" path="/admin/dashboard" active={active==="dashboard"} />
        <SidebarItem icon="bi-layout-text-window" label="content" path="/admin/content" active={active==="content"} />
        <SidebarItem icon="bi-images" label="gallery stats" path="/admin/gallery-stats" active={active==="gallery-stats"} />
        <SidebarItem icon="bi-people" label="services" path="/admin/services" active={active==="services"} />
        <SidebarItem icon="bi-box-seam" label="packages" path="/admin/packages" active={active==="packages"} />
<SidebarItem
  icon="bi-camera"
  label="Portfolio"
  path="/admin/portfolio"
  active={active === "portfolio"}
/>      </div>

      <div className="mt-auto pt-3">
        <button
          className="btn btn-outline-danger w-100"
          onClick={() => {
            localStorage.removeItem("adminToken");
            window.location.href = "/admin";
          }}
        >
          <i className="bi bi-box-arrow-right me-2"></i>
          Logout
        </button>
      </div>
    </>
  );
}
