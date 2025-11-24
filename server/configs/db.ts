import mongoose from "mongoose";
import type { ConnectOptions } from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Database connected successfully");
    });

    let mongodbURL: string | undefined = process.env.MONGODB_URL;
    const projectName = "abe-garage";

    if (!mongodbURL) {
      throw new Error("MONGODB_URL environment variable not set");
    }

    // Remove trailing slash
    if (mongodbURL.endsWith("/")) {
      mongodbURL = mongodbURL.slice(0, -1);
    }

    const fullURL = `${mongodbURL}/${projectName}`;

    await mongoose.connect(fullURL, {
      // Optional, but good for TS and future configs
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectDB;
