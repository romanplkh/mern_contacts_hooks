const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const dbConnect = require("./config/db");

//CONNECT DB
dbConnect();

//MIDDLEWARES

//BODY DATA TYPE
app.use(
  express.json({
    extended: false,
  })
);

//ROUTES
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

app.listen(PORT, () => {
  console.log(`Server Started....`);
});
