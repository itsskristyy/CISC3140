// create express app
var express = require("express")
var app = express()

// connect to the database
var db = require("./database.js")

// parse json data
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// initialize server port
var HTTP_PORT = 8000

// start server
app.listen(HTTP_PORT, () => {

    // display a mesage to the console indicating which port is being used
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});

//checks to see if it is working
app.get("/", (req, res, next) => {
    res.json({"message": "you are connected to the lab 4 car database."})
});

//prints out all the cars information

app.get("/cars", (req, res, next) => {

    // COALESCE allows the program to skip any null values

    var sql = `SELECT * FROM Cars WHERE Car_ID = COALESCE(?, Car_ID) AND Year = COALESCE(?, Year) AND Make = COALESCE(?, Make) AND Model = COALESCE(?, Model) AND
    Racer_Turbo = COALESCE(?, Racer_Turbo) AND Racer_Supercharged = COALESCE(?, Racer_Supercharged) AND Racer_Performance = COALESCE(?, Racer_Performance) AND Racer_Horsepower = COALESCE(?, Racer_Horsepower) AND
    Car_Overall = COALESCE(?, Car_Overall) AND Engine_Modifications = COALESCE(?, Engine_Modifications) AND Engine_Performance = COALESCE(?, Engine_Performance) AND Engine_Chrome = COALESCE(?, Engine_Chrome) AND Engine_Detailing = COALESCE(?, Engine_Detailing) AND Engine_Cleanliness = COALESCE(?, Engine_Cleanliness) AND
    Body_Frame_Undercarriage = COALESCE(?, Body_Frame_Undercarriage) AND Body_Frame_Suspension = COALESCE(?, Body_Frame_Suspension) AND Body_Frame_Chrome = COALESCE(?, Body_Frame_Chrome) AND Body_Frame_Detailing = COALESCE(?, Body_Frame_Detailing) AND Body_Frame_Cleanliness = COALESCE(?, Body_Frame_Cleanliness) AND
    Mods_Paint = COALESCE(?, Mods_Paint) AND Mods_Body = COALESCE(?, Mods_Body) AND Mods_Wrap = COALESCE(?, Mods_Wrap) AND Mods_Rims = COALESCE(?, Mods_Rims) AND Mods_Interior = COALESCE(?, Mods_Interior) AND Mods_Other = COALESCE(?, Mods_Other) AND Mods_ICE = COALESCE(?, Mods_ICE) AND Mods_Aftermarket = COALESCE(?, Mods_Aftermarket) AND Mods_WIP = COALESCE(?, Mods_WIP) AND Mods_Overall = COALESCE(?, Mods_Overall)`
    var params = [req.query.carid, req.query.year, req.query.make, req.query.model,
        req.query.racerturbo, req.query.racersupercharged, req.query.racerperformance, req.query.racerhorsepower,
        req.query.caroverall, req.query.enginemodifications, req.query.engineperformance, req.query.enginechrome, req.query.enginedetailing, req.query.enginecleanliness,
        req.query.bfundercarriage, req.query.bfsuspension, req.query.bfchrome, req.query.bfdetailing, req.query.bfcleanliness,
        req.query.modspaint, req.query.modsbody, req.query.modswrap, req.query.modsrims, req.query.modsinterior, req.query.modsother, req.query.modsice, req.query.modsaftermarket, req.query.modswip, req.query.modsoverall]

    db.all(sql, params, (err, rows) => {

        // error checking
        if(err) {
            res.status(400).json({"error": err.message});
            return;
        }

        // successful execution
        res.json({
            "message": "success",
            "data": rows
        })
    });
});
