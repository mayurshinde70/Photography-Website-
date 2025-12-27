const express = require("express");
const cors = require("cors");
require("dotenv").config();

const adminRoutes = require("./routes/adminRoutes");
const contentRoutes = require("./routes/contentRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const PackageRoutes = require("./routes/packageRoutes");
const weddingRoutes = require("./routes/weddings");
const contactRoutes = require("./routes/contact.routes");
const visitorRoutes = require("./routes/visitorRoutes");

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/api/admin", adminRoutes);
app.use("/api/content", contentRoutes);
app.use("/api", galleryRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/packages", PackageRoutes);
app.use("/api/weddings", weddingRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/admin", visitorRoutes);




const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});