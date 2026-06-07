const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/comics", require("./routes/comicRoute"));

app.listen(5000);