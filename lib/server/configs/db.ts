import mongoose from "mongoose";

let connectionPromise: Promise<typeof mongoose> | null = null;

const resolveMongoUri = (rawUri: string, dbName: string) => {
  try {
    const parsed = new URL(rawUri);
    if (!parsed.pathname || parsed.pathname === "/") {
      parsed.pathname = `/${dbName}`;
    }
    return parsed.toString();
  } catch {
    if (rawUri.includes("?")) {
      const [base, query = ""] = rawUri.split("?", 2);
      const normalizedBase = base.replace(/\/$/, "");
      return `${normalizedBase}/${dbName}?${query}`;
    }

    return `${rawUri.replace(/\/$/, "")}/${dbName}`;
  }
};

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }

  if (connectionPromise) {
    await connectionPromise;
    return mongoose;
  }

  const mongodbURL = process.env.MONGODB_URL;
  const dbName = "abe-garage";

  if (!mongodbURL) {
    return mongoose;
  }

  const fullURL = resolveMongoUri(mongodbURL, dbName);

  try {
    connectionPromise = mongoose.connect(fullURL, {
      serverSelectionTimeoutMS: 8000,
      connectTimeoutMS: 8000,
      socketTimeoutMS: 15000,
      family: 4,
    });
    await connectionPromise;
    connectionPromise = null;
    return mongoose;
  } catch (error) {
    connectionPromise = null;
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

export default connectDB;
