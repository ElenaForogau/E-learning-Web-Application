const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/db");

const courseRoutes = require("./routes/courses");
const userRoutes = require("./routes/UserRoutes");
const enrollmentRoutes = require("./routes/enrollments");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enrollments", enrollmentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
