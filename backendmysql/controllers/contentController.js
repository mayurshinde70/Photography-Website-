const db = require("../db");

// GET image
exports.getContent = (req, res) => {
  db.query(
    "SELECT hero_bg FROM website_content WHERE id = 1",
    (err, result) => {
      if (err) return res.status(500).json({ message: err.message });

      if (!result.length) return res.json(null);

      res.json({
        hero: {
          bgImage: result[0].hero_bg || "",
        },
      });
    }
  );
};

// SAVE image
exports.saveContent = (req, res) => {
  const { hero } = req.body;

  db.query(
    "UPDATE website_content SET hero_bg = ? WHERE id = 1",
    [hero?.bgImage || ""],
    (err) => {
      if (err) return res.status(500).json({ message: err.message });

      res.json({ message: "Image saved successfully" });
    }
  );
};
