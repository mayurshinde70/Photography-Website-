const db = require("../db");

/* GET */
exports.getPackages = (req, res) => {
    const sql = `
    SELECT p.*, GROUP_CONCAT(pp.point) AS bullets
    FROM packages p
    LEFT JOIN package_points pp ON p.id = pp.package_id
    GROUP BY p.id
  `;

    db.query(sql, (err, rows) => {
        if (err) return res.status(500).json(err);

        res.json(rows.map(r => ({
            id: r.id,
            category: r.category,
            title: r.title,
            price: r.price,
            img: r.image,
            recommended: !!r.recommended,
            bullets: r.bullets ? r.bullets.split(",") : []
        })));
    });
};

/* ADD */
exports.addPackage = (req, res) => {
    const { category, title, price, img, recommended, bullets } = req.body;

    db.query(
        "INSERT INTO packages (category,title,price,image,recommended) VALUES (?,?,?,?,?)", [category, title, price, img, recommended],
        (err, result) => {
            if (err) return res.status(500).json(err);

            const id = result.insertId;
            bullets.forEach(p =>
                db.query(
                    "INSERT INTO package_points (package_id, point) VALUES (?,?)", [id, p]
                )
            );

            res.json({ message: "Package added" });
        }
    );
};

/* UPDATE */
exports.updatePackage = (req, res) => {
    const { category, title, price, img, recommended, bullets } = req.body;
    const { id } = req.params;

    // 1️⃣ Update main package
    db.query(
        "UPDATE packages SET category=?, title=?, price=?, image=?, recommended=? WHERE id=?", [category, title, price, img, recommended, id],
        (err) => {
            if (err) return res.status(500).json(err);

            // 2️⃣ ONLY update points IF bullets are provided
            if (Array.isArray(bullets)) {
                db.query("DELETE FROM package_points WHERE package_id=?", [id], () => {
                    bullets.forEach(p => {
                        if (p && p.trim() !== "") {
                            db.query(
                                "INSERT INTO package_points (package_id, point) VALUES (?,?)", [id, p.trim()]
                            );
                        }
                    });
                });
            }

            res.json({ message: "Package updated safely" });
        }
    );
};
/* DELETE */
exports.deletePackage = (req, res) => {
    db.query("DELETE FROM packages WHERE id=?", [req.params.id], () => {
        res.json({ message: "Package deleted" });
    });
};