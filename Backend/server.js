// import express :-
import express from "express";
const app = express();

// import dotenv :-
import dotenv from "dotenv";
dotenv.config();

// import path :-
import path from "path";
const __dirname = path.resolve();

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
    origin: "https://localhost:8000",
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
const PORT = process.env.PORT;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server Listen at  http://localhost:${PORT}/`);
});
