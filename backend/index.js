import { app } from "./app.js";
import { connectDB } from "./config/db.js";
import { config } from "./config/env-config.js";

const startServer = async () => {
  const port = config.port;

  // CONNECT DB
  await connectDB();

  // SERVER RUNNING
  app.listen(port, () =>
    console.log(`Server running at port http://localhost:${port}`)
  );
};

startServer();
