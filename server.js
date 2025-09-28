const express = require("express");
const cors = require("cors");

// Import routes
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

// Middlewares
app.use(express.json());

// CORS configuration
// Allow frontend container access via host.docker.internal in Docker
app.use(
  cors({
    origin: [
      "http://localhost:3000",          // if running frontend locally
      "http://host.docker.internal:3000" // if frontend runs in Docker
    ],
    credentials: true,
  })
);

// Routes
app.use("/auth", authRoutes);
app.use("/product", productRoutes);
app.use("/cart", cartRoutes);
app.use("/order", orderRoutes);

// Health check endpoint
app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
