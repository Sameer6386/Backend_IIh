const express = require("express");
const app = express();
const adminRoutes = require("./Routes/adminRoutes");
const connectDB = require("./DataBase/database");

connectDB();

app.use(express.json());

app.use("/api/admins", adminRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
