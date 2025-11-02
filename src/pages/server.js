// import express from "express";
// import axios from "axios";
// import cors from "cors";

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.get("/api/search", async (req, res) => {
//   const { query } = req.query;
//   const options = {
//     method: "GET",
//     url: "https://google-search74.p.rapidapi.com/",
//     params: { query, limit: "15", related_keywords: "true" },
//     headers: {
//       "x-rapidapi-host": "google-search74.p.rapidapi.com",
//       "x-rapidapi-key": "783fc65f81msh4c90e8769344700p11fb8fjsnf192b1467fc9",
//     },
//   };

//   try {
//     const response = await axios.request(options);
//     res.json({ results: response.data.results });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "API request failed", details: err.message });
//   }
// });

// app.listen(5000, () =>
//   console.log("✅ Backend running at http://localhost:5000")
// );
// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose
  .connect("mongodb+srv://karangoswami2407_db_user:qZDpPUs5bnkFDKkg@cluster0.vda7vr7.mongodb.net/SmartCrop?retryWrites=true&w=majority")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error(err));

// ✅ Define Schema
const inventorySchema = new mongoose.Schema({
  user_id: String,
  crop_name: String,
  weight: Number,
  unit: String,
  harvest_date: String,
  category: String,
  freshness: String,
  created_at: { type: Date, default: Date.now },
});

const Inventory = mongoose.model("Inventory", inventorySchema);

// ✅ Helper: freshness logic
const getFreshness = (harvestDate, category) => {
  const now = new Date();
  const harvest = new Date(harvestDate);
  const diffDays = Math.floor((now - harvest) / (1000 * 3600 * 24));

  let shelfLife = 30;
  if (category.toLowerCase().includes("fruit")) shelfLife = 10;
  if (category.toLowerCase().includes("vegetable")) shelfLife = 7;
  if (category.toLowerCase().includes("grain")) shelfLife = 90;

  if (diffDays < shelfLife * 0.5) return "Fresh";
  if (diffDays < shelfLife) return "Sell Soon";
  return "Expired";
};

// ✅ POST - Add Product
app.post("/api/inventory", async (req, res) => {
  try {
    const product = req.body;
    product.freshness = getFreshness(product.harvest_date, product.category);
    const saved = await Inventory.create(product);
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET - All products of logged-in user
app.get("/api/inventory/:user_id", async (req, res) => {
  try {
    const items = await Inventory.find({ user_id: req.params.user_id }).sort({ created_at: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Start server
app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
