import React from "react";

export default function PBKLogo({ size = 70 }) {
  return (
    <svg
      width={size}
      height={size * 1.1}
      viewBox="0 0 200 220"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
    >
      {/* Crown */}
      <path
        d="M20 70 L60 10 L100 55 L140 10 L180 70 Z"
        fill="#9A1F23"
      />

      {/* Camera Body */}
      <rect x="35" y="120" width="90" height="60" rx="8" fill="black" />

      {/* Camera Lenses */}
      <circle cx="70" cy="120" r="25" fill="black" />
      <circle cx="110" cy="120" r="25" fill="black" />

      {/* Camera Lens Hood / Side Rectangle */}
      <polygon
        points="125,130 180,150 125,170"
        fill="black"
      />
    </svg>
  );
}
