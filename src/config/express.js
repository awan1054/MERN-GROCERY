import express from "express";
import router from "../routes.js";
import uploadPath from "../middleware/upload.middleware.js";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:5173", // Your frontend URL
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/upload", express.static(uploadPath));

app.use(router);

app.use((err, _req, res, next) => {
  const status = err?.status || 500;
  const message = err?.message || "internal server error ";
  const stack = err?.stack || "No stack";
  res.status(status).json({
    message,
    stack,
  });
});
//catch all route middleware
app.use("*", (_req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});
export default app;
