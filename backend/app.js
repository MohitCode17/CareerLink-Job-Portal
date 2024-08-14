import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// CORS CONFIG
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// MIDDLEWARES
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// TESTING API
app.get("/test", (req, res) => {
  res.send("Server health pass.");
});

// IMPORT ROUTES
import userRoutes from "./routes/user.route.js";
import jobRoutes from "./routes/job.route.js";
import companyRoutes from "./routes/company.route.js";
import applicationRoute from "./routes/application.route.js";

// DECLARATION OF ROUTES
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/job", jobRoutes);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/application", applicationRoute);

export { app };
