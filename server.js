const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const dbConnect = require("./config/db");
const cors = require("cors");

//CONNECT DB
dbConnect();

//MIDDLEWARES

//BODY DATA TYPE
app.use(
  express.json({
    extended: false,
  })
);

app.use(cors({ origin: "http://localhost:3000" }));

//ROUTES
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

app.listen(PORT, () => {
  console.log(`Server Started....`);
});
