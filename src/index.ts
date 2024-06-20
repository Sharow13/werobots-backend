import express from "express";
import router from "./router";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());
// Start the server and listen on port 3000
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use("/", router());
