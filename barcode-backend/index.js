import express from 'express';
import cors from 'cors';
import { supabase } from './supabase.js';

const app = express();
app.use(cors());
app.use(express.json());

// Root route (basic check)
app.get("/", (req, res) => {
  res.send("✅ Backend is running");
});

// GET product by barcode
app.get("/product/:barcode", async (req, res) => {
  const { barcode } = req.params;
  console.log("🔎 Searching for barcode:", barcode);

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("barcode", barcode)
    .single();

  if (error || !data) {
    console.error("❌ Product not found");
    return res.status(404).json({ error: "Product not found" });
  }

  res.json(data);
});

// POST new product
app.post("/product", async (req, res) => {
  const { name, price, barcode } = req.body;
  console.log("📥 Adding product:", req.body);

  const { data, error } = await supabase
    .from("products")
    .insert([{ name, price, barcode }])
    .select();

  if (error) {
    console.error("❌ Insert failed:", error.message);
    return res.status(500).json({ error: error.message });
  }

  res.json({
    message: "✅ Product added",
    product: data?.[0] || null
  });
});

// PUT update product
app.put("/product/:barcode", async (req, res) => {
  const { barcode } = req.params;
  const { name, price } = req.body;
  console.log("✏️ Updating product:", barcode, req.body);

  const { data, error } = await supabase
    .from("products")
    .update({ name, price })
    .eq("barcode", barcode)
    .select();

  if (error) {
    console.error("❌ Update failed:", error.message);
    return res.status(500).json({ error: error.message });
  }

  res.json({ message: "✅ Product updated", product: data?.[0] || null });
});

// DELETE product
app.delete("/product/:barcode", async (req, res) => {
  const { barcode } = req.params;
  console.log("🗑️ Deleting product:", barcode);

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("barcode", barcode);

  if (error) {
    console.error("❌ Delete failed:", error.message);
    return res.status(500).json({ error: error.message });
  }

  res.json({ message: "✅ Product deleted" });
});

// Test DB connection
app.get("/test-db", async (req, res) => {
  
  const {  error } = await supabase
    .from("products")
    .select("*")
    .limit(1);

  if (error) {
    
    return res.status(500).json({ error: "Database is connected" });
  }

  res.json({ message: "✅ Database connected"});
});

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
