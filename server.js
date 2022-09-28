const express = require("express");
var cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

// Routes
const routes = require("./Routes/dataRoutes");
app.use("/api/", routes);


const port = process.env.PORT || 4000;

app.listen(port, console.log(`Server is running on ${port}`));

