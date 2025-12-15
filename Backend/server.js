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
app.use(
  cors({
    origin: "https://the-techtribe.vercel.app",
    credentials: true,
  })
);
app.use(cookieParser());

// routes :-
app.use("/api/v1/user", userRoute);
app.use("/api/v1/blog", blogRoute);
app.use("/api/v1/comment", commentRoute);

// Connect database at startup (for Vercel serverless)
connectDB();

// ✅ VERCEL DEPLOYMENT: Frontend Vercel pe alag se serve hoga
// Yeh static files wala code ab zaruri nahi kyunki frontend separately deploy hai
// app.use(express.static(path.join(__dirname, "/Frontend/dist")));
// app.get(/.*/, (req, res) => {
//   res.sendFile(path.resolve(__dirname, "Frontend", "dist", "index.html"));
// });

// ❌ COMMENTED: Vercel serverless functions mein app.listen() kaam nahi karta
// Local development ke liye yeh zaroori hai, but production mein Vercel automatically handle karta hai
// listen server :-
// const PORT = process.env.PORT;
// app.listen(PORT, () => {
//   connectDB();
//   console.log(`Server Listen at  http://localhost:${PORT}/`);
// });

// ✅ VERCEL DEPLOYMENT: Express app ko export karna zaroori hai
// Vercel isko serverless function ke taur pe use karega
// Yeh line backend ko Vercel ke saath compatible banati hai
export default app;
