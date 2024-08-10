import { app } from "./app.js";

const startServer = () => {
  app.listen(8000, () => console.log(`Server running at port 8000`));
};

startServer();
