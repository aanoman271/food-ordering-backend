const express = require("express");
const dotenv = require("dotenv");
const { default: dbConnect } = require("../mongodb/db");

dotenv.config();
const app = express();

// middle wares
app.use(cors());
app.use(express.json());

// db connection
dbConnect();

app.get("/", (req, res) => res.send("backend is working"));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
