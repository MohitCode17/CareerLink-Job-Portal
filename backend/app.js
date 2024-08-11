import express from "express";
import fileUpload from "express-fileupload";

const app = express();

// MIDDLEWARES
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

// DECLARATION OF ROUTES
app.use("/api/v1/user", userRoutes);

export { app };
