const db = require("../db");

/* ADD CONTACT */
exports.addContact = (req, res) => {
    const {
        name,
        email,
        phone,
        event_type,
        event_date,
        location,
        message
    } = req.body;

    db.query(
        `INSERT INTO contacts 
     (name,email,phone,event_type,event_date,location,message)
     VALUES (?,?,?,?,?,?,?)`, [name, email, phone, event_type, event_date, location, message],
        err => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Contact saved" });
        }
    );
};

/* GET ALL (ADMIN) */
exports.getAllContacts = (req, res) => {
    db.query(
        "SELECT * FROM contacts ORDER BY created_at DESC",
        (err, rows) => {
            if (err) return res.status(500).json(err);
            res.json(rows);
        }
    );
};

/* UPDATE STATUS */
exports.updateStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    db.query(
        "UPDATE contacts SET status=? WHERE id=?", [status, id],
        err => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Status updated" });
        }
    );
};