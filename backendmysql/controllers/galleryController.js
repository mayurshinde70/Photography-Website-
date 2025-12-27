const db = require("../db");

// GET gallery stats (public)
exports.getGalleryStats = (req, res) => {
  db.query(
    "SELECT * FROM gallery_stats WHERE id = 1",
    (err, result) => {
      if (err) return res.status(500).json({ message: err.message });

      const row = result[0];
      if (!row) return res.json(null);

      res.json({
        years: row.years,
        clients: row.clients,
        tagline: row.tagline,
        images: [row.img1, row.img2, row.img3],
      });
    }
  );
};

// UPDATE gallery stats (admin)
exports.updateGalleryStats = (req, res) => {
  const { years, clients, tagline, images } = req.body;

  db.query(
    `UPDATE gallery_stats SET
      years = ?,
      clients = ?,
      tagline = ?,
      img1 = ?,
      img2 = ?,
      img3 = ?
     WHERE id = 1`,
    [
      years,
      clients,
      tagline,
      images?.[0] || "",
      images?.[1] || "",
      images?.[2] || "",
    ],
    (err) => {
      if (err) return res.status(500).json({ message: err.message });

      res.json({ message: "Gallery stats updated successfully" });
    }
  );
};
