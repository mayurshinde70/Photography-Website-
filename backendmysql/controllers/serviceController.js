const db = require("../db");

// GET (for public + admin)
exports.getServices = (req, res) => {
    const sql = `
    SELECT s.*, GROUP_CONCAT(p.point) AS points
    FROM services s
    LEFT JOIN service_points p ON s.id = p.service_id
    GROUP BY s.id
  `;

    db.query(sql, (err, rows) => {
        if (err) return res.status(500).json(err);

        const data = rows.map(r => ({
            id: r.id,
            title: r.title,
            tag: r.tag,
            desc: r.description,
            img: r.image,
            points: r.points ? r.points.split(",") : [],
        }));

        res.json(data);
    });
};

// ADD service
exports.addService = (req, res) => {
    const { title, tag, desc, img, points } = req.body;

    db.query(
        "INSERT INTO services (title, tag, description, image) VALUES (?, ?, ?, ?)", [title, tag, desc, img],
        (err, result) => {
            if (err) return res.status(500).json(err);

            const id = result.insertId;
            points.forEach(p => {
                db.query(
                    "INSERT INTO service_points (service_id, point) VALUES (?, ?)", [id, p]
                );
            });

            res.json({ message: "Service added" });
        }
    );
};

// UPDATE service
exports.updateService = (req, res) => {
    const { title, tag, desc, img, points } = req.body;
    const { id } = req.params;

    db.query(
        "UPDATE services SET title=?, tag=?, description=?, image=? WHERE id=?", [title, tag, desc, img, id],
        () => {
            db.query("DELETE FROM service_points WHERE service_id=?", [id]);
            points.forEach(p => {
                db.query(
                    "INSERT INTO service_points (service_id, point) VALUES (?, ?)", [id, p]
                );
            });
            res.json({ message: "Service updated" });
        }
    );
};

// DELETE service
exports.deleteService = (req, res) => {
    db.query("DELETE FROM services WHERE id=?", [req.params.id]);
    res.json({ message: "Service deleted" });
};