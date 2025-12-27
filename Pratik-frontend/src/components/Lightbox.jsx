import React, { useEffect, useState } from "react";

export default function Lightbox({ images = [], captions = [], start = 0, onClose }) {
  const [i, setI] = useState(start);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line
  }, [i]);

  function next() {
    setI((p) => (p + 1) % images.length);
  }
  function prev() {
    setI((p) => (p - 1 + images.length) % images.length);
  }
  function handleClose() {
    onClose();
  }

  return (
    <div className="lightbox" role="dialog" aria-modal="true">
      <div className="lightbox-backdrop" onClick={handleClose} />
      <div className="lightbox-inner">
        <button className="lb-close" onClick={handleClose} aria-label="Close">✕</button>
        <button className="lb-nav lb-prev" onClick={prev} aria-label="Previous">‹</button>

        <div className="lb-content">
          <img src={images[i]} alt={captions[i] || `Image ${i + 1}`} />
          {captions?.[i] && <div className="lb-caption">{captions[i]}</div>}
        </div>

        <button className="lb-nav lb-next" onClick={next} aria-label="Next">›</button>
      </div>
    </div>
  );
}
