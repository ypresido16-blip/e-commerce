import dns from "node:dns";



import "dotenv/config";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import type { UploadApiResponse } from "cloudinary";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();

app.use(cors());
app.use(express.json());

// Cloudinary configuration
cloudinary.config({
cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
api_key: process.env.CLOUDINARY_API_KEY,
api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer configuration
const upload = multer({
storage: multer.memoryStorage(),
limits: {
fileSize: 5 * 1024 * 1024, // Maximum 5 MB
},
});

// MongoDB product schema
const productSchema = new mongoose.Schema({
name: {
type: String,
required: true,
trim: true,
},
price: {
type: Number,
required: true,
min: 0,
},
image: {
type: String,
required: true,
},
});

const Product = mongoose.model("Product", productSchema);

// Existing sample products
const products = [
{
id: 1,
name: "Sneakers",
price: 59,
image: "sneakers.jpg",
},
{
id: 2,
name: "Leather Backpack",
price: 89,
image: "backpack.jpg",
},
{
id: 3,
name: "Denim Jacket",
price: 75,
image: "jacket.jpg",
},
{
id: 4,
name: "Classic Sneakers",
price: 120,
image: "classicsneakers.jpg",
},
];

// Welcome route
app.get("/api", (_req, res) => {
res.json({
message: "Welcome to House of Althea API",
status: "success",
});
});

// Get all products
app.get("/api/products", async (_req, res) => {
try {
const allProducts = await Product.find();
res.json(allProducts);
} catch (error) {
console.error("Fetch products error:", error);
res.status(500).json({ message: "Failed to fetch products" });
}
});

// Existing cart route
app.post("/api/cart", async (req, res) => {
const { productId, quantity } = req.body;

const product = products.find((item) => item.id === productId);

if (!product) {
return res.status(404).json({ message: "Product not found" });
}

return res.json({
message: "Product added to cart",
product,
quantity,
});
});

// Create a product
app.post("/api/products", async (req, res) => {
try {
const newProduct = await Product.create(req.body);
res.status(201).json(newProduct);
} catch (error) {
console.error("Create product error:", error);
res.status(400).json({ message: "Failed to create product" });
}
});

// Delete a product
app.delete("/api/products/:id", async (req, res) => {
try {
const product = await Product.findByIdAndDelete(req.params.id);


if (!product) {
  return res.status(404).json({ message: "Product not found" });
}

return res.json({ message: "Product deleted successfully" });


} catch (error) {
console.error("Delete product error:", error);
return res.status(500).json({ message: "Failed to delete product" });
}
});

// Upload an image to Cloudinary
app.post("/api/upload", upload.single("image"), async (req, res) => {
try {
if (!req.file) {
return res.status(400).json({
message: "No image uploaded. Use the field name 'image'.",
});
}

const result = await new Promise<UploadApiResponse>(
  (resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "house-of-althea",
        resource_type: "image",
      },
      (error, uploadResult) => {
        if (error) {
          reject(error);
        } else if (uploadResult) {
          resolve(uploadResult);
        } else {
          reject(new Error("Cloudinary returned no upload result"));
        }
      }
    );

    stream.end(req.file!.buffer);
  }
);

return res.status(200).json({
  message: "Image uploaded successfully",
  imageUrl: result.secure_url,
});


} catch (error) {
console.error("Image upload error:", error);


return res.status(500).json({
  message: "Image upload failed",
});


}
});

// Seed sample products
app.get("/api/seed", async (_req, res) => {
try {
await Product.deleteMany({});
await Product.create(products);


return res.json({
  message: "Sample products added successfully",
});


} catch (error) {
console.error("Seed products error:", error);
return res.status(500).json({ message: "Failed to seed products" });
}
});

// Connect to MongoDB before starting the server
const PORT = Number(process.env.PORT) || 5000;

mongoose
.connect(process.env.MONGODB_URI as string)
.then(() => {
console.log("Connected to MongoDB");


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


})
.catch((error) => {
console.error("MongoDB connection error:", error.message);
process.exit(1);
});


