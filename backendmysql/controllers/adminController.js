const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.adminLogin = (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM admins WHERE email = ?";

    db.query(sql, [email], async(err, result) => {
        if (err) return res.status(500).json({ message: err.message });

        if (result.length === 0) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const admin = result[0];
        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: admin.id, role: "admin" },
            process.env.JWT_SECRET, { expiresIn: "1d" }
        );

        res.json({
            token,
            admin: {
                id: admin.id,
                email: admin.email,
            },
        });
    });
};

exports.addVisit = (req, res) => {
    res.json({ message: "visit added" });
};

exports.getVisits = (req, res) => {
    res.json({ visits: 10 });
};

exports.getVisitGraph = (req, res) => {
    res.json([]);
};