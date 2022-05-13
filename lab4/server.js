const express = require("express")
const app = express()
const PORT = 8000
const bodyParser = require("body-parser");
const carRoutes = require('./Cars')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
app.set('json spaces', 3)
app.get("/", (req, res, next) => {
    res.json({"message": "Connected to Database"})
});
app.use("/cars", carRoutes)
app.use(function (req, res) {
    res.status(404);
});
app.listen(PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", PORT))
});
