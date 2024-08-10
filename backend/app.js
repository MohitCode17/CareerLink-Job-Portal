import express from "express";

const app = express();

// TESTING API
app.get("/test", (req, res) => {
  res.send("Server health pass.");
});

export { app };
