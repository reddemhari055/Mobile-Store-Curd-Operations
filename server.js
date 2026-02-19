require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Mobile = require("./models/Mobile");

const app = express();

app.use(express.json());
app.use(express.static("public"));

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log("MongoDB Error ❌", err));

// Routes

app.get("/api/mobiles", async (req, res) => {
  const mobiles = await Mobile.find();
  res.json(mobiles);
});

app.post("/api/mobiles", async (req, res) => {
  const mobile = new Mobile(req.body);
  await mobile.save();
  res.status(201).json(mobile);
});

app.put("/api/mobiles/:id", async (req, res) => {
  await Mobile.findByIdAndUpdate(req.params.id, req.body);
  res.sendStatus(200);
});

app.delete("/api/mobiles/:id", async (req, res) => {
  await Mobile.findByIdAndDelete(req.params.id);
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
