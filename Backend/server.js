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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ✅ CORS Configuration: Vercel ke preview aur production dono URLs ko allow karta hai
// Preview URLs format: https://projectname-xxxxx-username.vercel.app
// Production URL: https://the-techtribe.vercel.app
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests from Vercel deployments (preview + production)
      const allowedOrigins = [
        "https://the-techtribe.vercel.app", // Production URL
        /https:\/\/the-techtribe-.*\.vercel\.app$/, // Preview URLs (regex pattern)
      ];

      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);

      // Check if origin matches production or preview pattern
      const isAllowed = allowedOrigins.some((pattern) => {
        if (pattern instanceof RegExp) {
          return pattern.test(origin);
        }
        return pattern === origin;
      });

      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(cookieParser());

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
