const express = require("express");
const mongoDB = require("./db");

const app = express();
const port = 4000;

mongoDB();

// Middleware
app.use(express.json());
const allowedOrigins = [
  "https://fast-feast-topaz.vercel.app",
  "https://fast-feast-6wxi9g6m6-khadeom238-4493s-projects.vercel.app"
];

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );

  next();
});
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