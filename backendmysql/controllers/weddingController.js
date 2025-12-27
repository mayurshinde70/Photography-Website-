const db = require("../db");

/* ================= Utility ================= */
function slugify(text) {
    return text
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "");
}

/* ================= GET ALL (ADMIN) ================= */
exports.getAllWeddings = (req, res) => {
    db.query(
        "SELECT * FROM weddings ORDER BY created_at DESC",
        (err, rows) => {
            if (err) return res.status(500).json(err);
            res.json(rows);
        }
    );
};

/* ================= GET BY SLUG (FRONTEND) ================= */
exports.getWeddingBySlug = (req, res) => {
    const { slug } = req.params;

    db.query(
        "SELECT * FROM weddings WHERE slug = ?", [slug],
        (err, rows) => {
            if (err) return res.status(500).json(err);
            if (rows.length === 0)
                return res.status(404).json({ message: "Wedding not found" });

            const wedding = rows[0];

            db.query(
                "SELECT id, image_url FROM wedding_photos WHERE wedding_id = ? ORDER BY created_at DESC", [wedding.id],
                (err2, photos) => {
                    if (err2) return res.status(500).json(err2);

                    // ✅ frontend expects array of objects
                    wedding.photos = photos;

                    res.json(wedding);
                }
            );
        }
    );
};

/* ================= ADD WEDDING ================= */
exports.addWedding = (req, res) => {
    const {
        title,
        slug,
        short_desc = "",
        full_desc = "",
        cover_image = ""
    } = req.body;

    if (!title)
        return res.status(400).json({ message: "Title required" });

    const finalSlug = slug ? slugify(slug) : slugify(title);

    db.query(
        `INSERT INTO weddings (slug, title, short_desc, full_desc, cover_image)
     VALUES (?,?,?,?,?)`, [finalSlug, title, short_desc, full_desc, cover_image],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Wedding added", id: result.insertId });
        }
    );
};

/* ================= UPDATE WEDDING ================= */
exports.updateWedding = (req, res) => {
    const { id } = req.params;
    const {
        title,
        slug,
        short_desc = "",
        full_desc = "",
        cover_image = ""
    } = req.body;

    if (!title)
        return res.status(400).json({ message: "Title required" });

    const finalSlug = slug ? slugify(slug) : slugify(title);

    db.query(
        `UPDATE weddings
     SET slug=?, title=?, short_desc=?, full_desc=?, cover_image=?
     WHERE id=?`, [finalSlug, title, short_desc, full_desc, cover_image, id],
        err => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Wedding updated" });
        }
    );
};

/* ================= DELETE WEDDING ================= */
exports.deleteWedding = (req, res) => {
    const { id } = req.params;

    db.query(
        "DELETE FROM weddings WHERE id=?", [id],
        err => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Wedding deleted" });
        }
    );
};

/* ================= GET GALLERY PHOTOS ================= */
exports.getWeddingPhotos = (req, res) => {
    const { id } = req.params;

    db.query(
        "SELECT id, image_url FROM wedding_photos WHERE wedding_id=? ORDER BY created_at DESC", [id],
        (err, rows) => {
            if (err) return res.status(500).json(err);
            res.json(rows);
        }
    );
};

/* ================= ADD SINGLE / MULTI PHOTOS ================= */
exports.addWeddingPhotos = (req, res) => {
    const { id } = req.params;
    const { image_url, images } = req.body;

    // single
    if (image_url) {
        db.query(
            "INSERT INTO wedding_photos (wedding_id, image_url) VALUES (?,?)", [id, image_url],
            err => {
                if (err) return res.status(500).json(err);
                res.json({ message: "Photo added" });
            }
        );
        return;
    }

    // multiple
    if (Array.isArray(images) && images.length > 0) {
        const values = images.map(img => [id, img]);
        db.query(
            "INSERT INTO wedding_photos (wedding_id, image_url) VALUES ?", [values],
            err => {
                if (err) return res.status(500).json(err);
                res.json({ message: "Gallery photos added" });
            }
        );
        return;
    }

    res.status(400).json({ message: "No image provided" });
};

/* ================= DELETE SINGLE PHOTO ================= */
exports.deleteWeddingPhoto = (req, res) => {
    const { photoId } = req.params;

    db.query(
        "DELETE FROM wedding_photos WHERE id=?", [photoId],
        err => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Photo deleted" });
        }
    );
};