// // server.js
// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";

// const app = express();
// app.use(express.json());
// app.use(cors());

// // ✅ Replace with your MongoDB connection string
// const MONGO_URI = "mongodb+srv://karangoswami2407_db_user:qZDpPUs5bnkFDKkg@cluster0.vda7vr7.mongodb.net/?appName=Cluster0";

// // ✅ Connect to MongoDB
// mongoose
//   .connect(MONGO_URI, { dbName: "smartcrop" })
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => console.error("❌ MongoDB connection error:", err));

// // 🧩 Schema
// const productSchema = new mongoose.Schema({
//   user_id: { type: String, required: true },
//   crop_name: String,
//   weight: Number,
//   unit: String,
//   harvest_date: String,
//   category: String,
//   created_at: { type: Date, default: Date.now },
// });

// const Product = mongoose.model("Product", productSchema);

// // ➕ Add Product
// app.post("/api/products", async (req, res) => {
//   try {
//     const product = new Product(req.body);
//     await product.save();
//     res.status(201).json({ message: "Product added successfully", product });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // 📦 Get All Products for a User
// app.get("/api/products/:user_id", async (req, res) => {
//   try {
//     const { user_id } = req.params;
//     const products = await Product.find({ user_id }).sort({ created_at: -1 });
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // ❌ Delete Product
// app.delete("/api/products/:id", async (req, res) => {
//   try {
//     await Product.findByIdAndDelete(req.params.id);
//     res.json({ message: "Product deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // 🟢 Start server
// const PORT = 8080;
// app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(express.json());
app.use(cors());

// ✅ MongoDB Connection
const MONGO_URI = "mongodb+srv://karangoswami2407_db_user:qZDpPUs5bnkFDKkg@cluster0.vda7vr7.mongodb.net/?appName=Cluster0";

mongoose
  .connect(MONGO_URI, { dbName: "smartcrop" })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// 🧩 Schema
const productSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  crop_name: { type: String, required: true },
  category: { type: String, enum: ["fruit", "vegetable", "grain"], required: true },
  weight: { type: Number, required: true },
  unit: { type: String, enum: ["kg", "quintal", "tonne", "gram"], required: true },
  harvest_date: String,
  created_at: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", productSchema);

//
// ➕ Add Product
//
app.post("/api/products", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ message: "✅ Product added successfully", product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//
// 📦 Get All Products for a User
//
app.get("/api/products/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const products = await Product.find({ user_id }).sort({ created_at: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//
// ✏️ Update Product (Weight, Unit, etc.)
//
// ✏️ Update Product (Weight, Unit, etc.)
app.put("/api/products/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "❌ Product not found" });
    res.json({ message: "✅ Product updated successfully", product: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
    

//
// ❌ Delete Product
//
app.delete("/api/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "🗑️ Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//
// 🤖 AI Insights (Gemini Flash 2.0)
//
app.get("/api/insights/:user_id", async (req, res) => {
  try {
    const products = await Product.find({ user_id: req.params.user_id });
    if (products.length === 0) return res.json({ insight: "No products found for AI analysis." });

    // Format data for Gemini
    const prompt = `
    Analyze the following crop, vegetable, and grain data and give farming insights.
    Data: ${JSON.stringify(products, null, 2)}
    Focus on yield patterns, freshness, and selling suggestions.
    `;

    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyAJQSqjLfUr7NDnEAFz6Y60jABfbDEKJps",
      { contents: [{ parts: [{ text: prompt }] }] },
      { headers: { "Content-Type": "application/json" } }
    );

    const aiText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No AI insight generated.";
    res.json({ insight: aiText });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//
// 🚀 Start server
//



// 💰 Revenue Schema
// const revenueSchema = new mongoose.Schema({
//   user_id: String,
//   crop_name: String,
//   quantity: Number,
//   unit: String,
//   harvest_date: String,
//   selling_date: String,
//   fertilizer_cost: Number,
//   seed_cost: Number,
//   selling_price: Number,
// });
// const Revenue = mongoose.model("Revenue", revenueSchema);

// // ➕ Add Record
// app.post("/api/revenue", async (req, res) => {
//   try {
//     const rec = new Revenue(req.body);
//     await rec.save();
//     res.json(rec);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // 📦 Get Records
// app.get("/api/revenue/:user_id", async (req, res) => {
//   const data = await Revenue.find({ user_id: req.params.user_id });
//   res.json(data);
// });

// // ✏️ Update
// app.put("/api/revenue/:id", async (req, res) => {
//   const data = await Revenue.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   res.json(data);
// });

// // ❌ Delete
// app.delete("/api/revenue/:id", async (req, res) => {
//   await Revenue.findByIdAndDelete(req.params.id);
//   res.json({ message: "Deleted successfully" });
// });













// // 💰 Revenue Schema (updated)
// const revenueSchema = new mongoose.Schema({
//   user_id: { type: String, required: true },
//   crop_name: { type: String, required: true },
//   quantity: { type: Number, required: true },
//   unit: { type: String, enum: ["kg", "quintal", "tonne", "gram"], required: true },
//   harvest_date: String,
//   selling_date: String,
//   fertilizer_cost: { type: Number, default: 0 },
//   seed_cost: { type: Number, default: 0 },
//   misc_expense: { type: Number, default: 0 }, // 🆕 Added
//   damaged_quantity: { type: Number, default: 0 }, // 🆕 Added
//   selling_price: { type: Number, required: true },
//   total_cost: { type: Number, default: 0 }, // 🧮 Computed
//   profit: { type: Number, default: 0 },     // 🧮 Computed
//   created_at: { type: Date, default: Date.now },
// });

// const Revenue = mongoose.model("Revenue", revenueSchema);

// //
// // ➕ Add Record (auto profit + total cost calculation)
// //
// app.post("/api/revenue", async (req, res) => {
//   try {
//     const data = req.body;

//     // Compute total cost
//     data.total_cost =
//       (data.seed_cost || 0) +
//       (data.fertilizer_cost || 0) +
//       (data.misc_expense || 0);

//     // Compute effective quantity (excluding damaged)
//     const effectiveQty = Math.max((data.quantity || 0) - (data.damaged_quantity || 0), 0);

//     // ✅ Correct profit calculation
//     data.profit = (effectiveQty * (data.selling_price || 0)) - data.total_cost;

//     const record = new Revenue(data);
//     await record.save();

//     res.status(201).json({ message: "✅ Revenue record added", record });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


// //
// // 📦 Get Records
// //
// app.get("/api/revenue/:user_id", async (req, res) => {
//   try {
//     const data = await Revenue.find({ user_id: req.params.user_id }).sort({ created_at: -1 });
//     res.json(data);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// //
// // ✏️ Update Record
// //
// app.put("/api/revenue/:id", async (req, res) => {
//   try {
//     const data = req.body;

//     // Recalculate totals
//     data.total_cost =
//       (data.seed_cost || 0) +
//       (data.fertilizer_cost || 0) +
//       (data.misc_expense || 0);

//     const effectiveQty = Math.max((data.quantity || 0) - (data.damaged_quantity || 0), 0);

//     // ✅ Correct profit calculation
//     data.profit = (effectiveQty * (data.selling_price || 0)) - data.total_cost;

//     const updated = await Revenue.findByIdAndUpdate(req.params.id, data, { new: true });
//     res.json({ message: "✅ Updated successfully", record: updated });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


// //
// // ❌ Delete Record
// //
// app.delete("/api/revenue/:id", async (req, res) => {
//   try {
//     await Revenue.findByIdAndDelete(req.params.id);
//     res.json({ message: "🗑️ Deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


// const revenueSchema = new mongoose.Schema({
//   user_id: String,
//   crop_name: String,
//   quantity: Number,
//   unit: String,
//   harvest_date: String,
//   selling_date: String,
//   seed_cost: Number,
//   fertilizer_cost: Number,
//   misc_expense: Number,
//   damaged_quantity: Number,
//   selling_price: Number,
//   profit: Number,
// });

// const Revenue = mongoose.model("Revenue", revenueSchema);

// // Routes
// app.get("/api/revenue/:user_id", async (req, res) => {
//   const data = await Revenue.find({ user_id: req.params.user_id });
//   res.json(data);
// });

// app.post("/api/revenue", async (req, res) => {
//   const record = new Revenue(req.body);
//   await record.save();
//   res.json({ message: "Record saved successfully!" });
// });

// app.put("/api/revenue/:id", async (req, res) => {
//   await Revenue.findByIdAndUpdate(req.params.id, req.body);
//   res.json({ message: "Record updated successfully!" });
// });

// app.delete("/api/revenue/:id", async (req, res) => {
//   await Revenue.findByIdAndDelete(req.params.id);
//   res.json({ message: "Record deleted successfully!" });
// });

// // app.listen(8080, () => console.log("🚀 Server running on http://localhost:8080"));









const revenueSchema = new mongoose.Schema({
  user_id: String,
  crop_name: String,
  quantity: Number,
  unit: String,
  harvest_date: String,
  selling_date: String,
  seed_cost: Number,
  fertilizer_cost: Number,
  misc_expense: Number,
  damaged_quantity: Number,
  selling_price: Number,
  profit: Number,
});

const Revenue = mongoose.model("Revenue", revenueSchema);

// Routes
app.get("/api/revenue", async (req, res) => {
  const data = await Revenue.find();
  res.json(data);
});

app.post("/api/revenue", async (req, res) => {
  const newRecord = new Revenue(req.body);
  await newRecord.save();
  res.json(newRecord);
});

app.put("/api/revenue/:id", async (req, res) => {
  const updated = await Revenue.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

app.delete("/api/revenue/:id", async (req, res) => {
  await Revenue.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

