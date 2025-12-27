import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SidebarItem from "./Sidebaritem";

export default function AdminLayout() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* SIDEBAR */}
      <SidebarItem active="galleries" />

      {/* MAIN CONTENT */}
      <div className="flex-grow-1">
        {/* TOP BAR (mobile toggle) */}
        <div className="bg-light border-bottom p-2 d-md-none">
          <button
            className="btn btn-outline-dark btn-sm"
            onClick={() => setOpen(!open)}
          >
            ☰ Menu
          </button>
        </div>

        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

/* SIDEBAR ITEM */
 
