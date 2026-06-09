import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const seedInMemoryDB = async () => {
  try {
    const Stock = (await import("../models/Stock.js")).default;
    const stocksDataPath = path.join(__dirname, "../data/stocks.json");
    if (fs.existsSync(stocksDataPath)) {
      const stocksData = JSON.parse(fs.readFileSync(stocksDataPath, "utf8"));
      console.log(`📊 Found ${stocksData.length} stocks to seed in memory`);
      await Stock.deleteMany({});
      await Stock.insertMany(stocksData);
      console.log("✅ Successfully seeded in-memory MongoDB!");
    } else {
      console.log("⚠️ Stocks data file not found at", stocksDataPath);
    }
  } catch (error) {
    console.error("❌ Error seeding in-memory database:", error);
  }
};

const connectDB = async (url) => {
  if (!url) {
    console.log("⚠️ No MONGO_URI provided. Starting in-memory MongoDB...");
    return connectToMemoryServer();
  }

  try {
    console.log("🔌 Attempting to connect to MongoDB Atlas...");
    const conn = await mongoose.connect(url, {
      serverSelectionTimeoutMS: 5000
    });
    console.log("✅ Connected to MongoDB Atlas successfully!");
    return conn;
  } catch (error) {
    console.log("\n❌ Failed to connect to MongoDB Atlas (e.g., SSL alert 80 IP whitelist error or timeout):");
    console.log(error.message);
    console.log("\n🔄 Falling back to in-memory MongoDB Server...");
    return connectToMemoryServer();
  }
};

async function connectToMemoryServer() {
  try {
    const { MongoMemoryServer } = await import("mongodb-memory-server");
    const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    console.log(`🚀 In-memory MongoDB Server started at: ${mongoUri}`);
    const conn = await mongoose.connect(mongoUri);
    console.log("✅ Connected to in-memory MongoDB successfully!");
    
    // Seed the database immediately
    await seedInMemoryDB();
    
    return conn;
  } catch (err) {
    console.error("❌ Failed to start in-memory MongoDB server:", err);
    throw err;
  }
}

export default connectDB;
