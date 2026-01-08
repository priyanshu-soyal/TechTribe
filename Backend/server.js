// import express :-
import express from "express";
const app = express();

// import dotenv :-
import dotenv from "dotenv";
// import path :-
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure dotenv to read from parent directory (TechTribe folder)
dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

// import cookie-parser
import cookieParser from "cookie-parser";

// import mongoose :-
import connectDB from "./Database/DB.js";

// import routes :-
import userRoute from "./routes/userRoute.js";
import blogRoute from "./routes/blogRoute.js";
import commentRoute from "./routes/commentRoute.js";

// import cors
import cors from "cors";

// use default middlewares :-
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// routes :-
app.use("/api/v1/user", userRoute);
app.use("/api/v1/blog", blogRoute);
app.use("/api/v1/comment", commentRoute);

// Serve static files for production
app.use(express.static(path.join(__dirname, "/Frontend/dist")));
app.get(/.*/, (req, res) => {
  res.sendFile(path.resolve(__dirname, "Frontend", "dist", "index.html"));
});

// listen server :-
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server Listen at  http://localhost:${PORT}/`);
});
