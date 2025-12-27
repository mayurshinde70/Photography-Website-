const db = require("../db");

/* 🔥 ADD VISIT (every page load) */
exports.addVisit = (req, res) => {
    db.query(
        "UPDATE site_visits SET visits = visits + 1 WHERE id = 1",
        err => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Visit counted" });
        }
    );
};

/* 📊 GET TOTAL VISITS */
exports.getVisits = (req, res) => {
    db.query(
        "SELECT visits FROM site_visits WHERE id = 1",
        (err, rows) => {
            if (err) return res.status(500).json(err);
            res.json({ visits: rows[0].visits });
        }
    );
};