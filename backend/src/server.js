// Load env variables FIRST using require (runs immediately)
import { config } from 'dotenv';
config();

// Now import everything else
import express from "express";
import cors from "cors";
import path from "path";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "../config/db.js";
import rateLimiter from "../middleware/rateLimiter.js";

// Test env loading
console.log("Testing env vars:");
console.log("MONGO_URI:", process.env.MONGO_URI ? "✅ Found" : "❌ Missing");
console.log("FIREBASE_PROJECT_ID:", process.env.FIREBASE_PROJECT_ID ? "✅ Found" : "❌ Missing");

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// ... rest of your code stays the same

// ... rest of your code stays the same

//middleware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}

app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server started on PORT: http://localhost:${PORT}/api/notes`);
  });
});
