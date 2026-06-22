const express = require("express");
const mongoDB = require("./db");
const cors = require("cors");

const app = express();
const port = 4000;

mongoDB();

// Middleware
app.use(express.json());
const allowedOrigins = [
  "http://localhost:3000",
  "https://fast-feast-topaz.vercel.app",
  "https://fast-feast-6wxi9g6m6-khadeom238-4493s-projects.vercel.app"
];



app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://fast-feast-topaz.vercel.app",
    "https://fast-feast-6wxi9g6m6-khadeom238-4493s-projects.vercel.app"
  ],
  credentials: true
}));
// Routes
app.use("/api", require("./Routes/CreatUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});