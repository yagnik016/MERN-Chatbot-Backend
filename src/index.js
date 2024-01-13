import app from "./app.js";
import { connectionToDatabase } from "./Database/Db.js";
const Port = process.env.PORT || 5000;

connectionToDatabase().then(() => {
  app.listen(Port, () => {
    console.log(`Server started on port ${Port}`);
  });
});
