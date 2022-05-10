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

        //endpoint to get a list of owners in the Owners table
/*
    Car_ID, Name, and Email can optionally be specified to display only records that meet certain criteria
*/
app.get("/owners", (req, res, next) => {

    // initialize the sql command and the parameter array
    // COALESCE allows the user to specify some field values but not others
    var sql = "SELECT * FROM Owners WHERE Car_ID = COALESCE(?, Car_ID) AND Name = COALESCE(?, Name) AND Email = COALESCE(?, Email)"
    var params = [req.query.carid, req.query.name, req.query.email]

    db.all(sql, params, (err, rows) => {

        // error checking
        if(err) {
            res.status(400).json({"error":err.message});
            return;
        }

        // successful execution
        res.json({
            "message": "success",
            "data": rows
        })
    });
});

// endpoint to get a single car by ID
app.get("/cars/:carid", (req, res, next) => {

    // initialize the sql command and the parameter array
    var sql = "SELECT * FROM Cars WHERE Car_ID = ?"
    var params = [req.params.carid]

    db.get(sql, params, (err, row) => {

        // error checking
        if(err) {
            res.status(400).json({"error":err.message});
            return;
        }

        // successful execution
        res.json({
            "message":"success",
            "data":row
        })
    });
});

// endpoint to get a single owner by Car ID
app.get("/owners/:name", (req, res, next) => {

    // initialize the sql command and the parameter array
    var sql = "SELECT * FROM Owners WHERE Name = ?"
    var params = [req.params.name]

    db.get(sql, params, (err, row) => {

        // error checking
        if(err) {
            res.status(400).json({"error":err.message});
            return;
        }

        // successful execution
        res.json({
            "message":"success",
            "data":row
        })
    });
});

// endpoint to add a new car/new cars
// multiple cars can be added as JSON objects
app.post("/cars/", (req, res, next) => {

    // initialize the sql command, the parameter array, and a coutner fo rhte number of objects to insert
    var sql = `INSERT INTO Cars (Car_ID, Year, Make, Model,
        Racer_Turbo, Racer_Supercharged, Racer_Performance, Racer_Horsepower,
        Car_Overall, Engine_Modifications, Engine_Performance, Engine_Chrome, Engine_Detailing, Engine_Cleanliness,
        Body_Frame_Undercarriage, Body_Frame_Suspension, Body_Frame_Chrome, Body_Frame_Detailing, Body_Frame_Cleanliness,
        Mods_Paint, Mods_Body, Mods_Wrap, Mods_Rims, Mods_Interior, Mods_Other, Mods_ICE, Mods_Aftermarket, Mods_WIP, Mods_Overall)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    var params = []
    let numObjsToInsert = 0;

    // loop through the request body that was passed in
    for(var obj in req.body.bulk) {

        // create an array of potential errors
        var errors = []
        if(!req.body.bulk[obj].carid && req.body.bulk[obj].carid != 0) { errors.push("No Car ID specified"); }
        if(!req.body.bulk[obj].year && req.body.bulk[obj].year != 0) { errors.push("No Year specified"); }
        if(!req.body.bulk[obj].make) { errors.push("No Make specified"); }
        if(!req.body.bulk[obj].model) { errors.push("No Model specified"); }
        if(!req.body.bulk[obj].racerturbo && req.body.bulk[obj].racerturbo != 0) { errors.push("No Racer Turbo score specified"); }
        if(!req.body.bulk[obj].racersupercharged && req.body.bulk[obj].racersupercharged != 0) { errors.push("No Racer Supercharged score specified"); }
        if(!req.body.bulk[obj].racerperformance && req.body.bulk[obj].racerperformance != 0) { errors.push("No Racer Performance score specified"); }
        if(!req.body.bulk[obj].racerhorsepower && req.body.bulk[obj].racerhorsepower != 0) { errors.push("No Racer Horsepower score specified"); }
        if(!req.body.bulk[obj].caroverall && req.body.bulk[obj].caroverall != 0) { errors.push("No Car Overall score specified"); }
        if(!req.body.bulk[obj].enginemodifications && req.body.bulk[obj].enginemodifications != 0) { errors.push("No Engine Modifications score specified"); }
        if(!req.body.bulk[obj].engineperformance && req.body.bulk[obj].engineperformance != 0) { errors.push("No Engine Performance score specified"); }
        if(!req.body.bulk[obj].enginechrome && req.body.bulk[obj].enginechrome != 0) { errors.push("No Engine Chrome score specified"); }
        if(!req.body.bulk[obj].enginedetailing && req.body.bulk[obj].enginedetailing != 0) { errors.push("No Engine Detailing score specified"); }
        if(!req.body.bulk[obj].enginecleanliness && req.body.bulk[obj].enginecleanliness != 0) { errors.push("No Engine Cleanliness score specified"); }
        if(!req.body.bulk[obj].bfundercarriage && req.body.bulk[obj].bfundercarriage != 0) { errors.push("No Body Frame Undercarriage score specified"); }
        if(!req.body.bulk[obj].bfsuspension && req.body.bulk[obj].bfsuspension != 0) { errors.push("No Body Frame Suspension score specified"); }
        if(!req.body.bulk[obj].bfchrome && req.body.bulk[obj].bfchrome != 0) { errors.push("No Body Frame Chrome score specified"); }
        if(!req.body.bulk[obj].bfdetailing && req.body.bulk[obj].bfdetailing != 0) { errors.push("No Body Frame Detailing score specified"); }
        if(!req.body.bulk[obj].bfcleanliness && req.body.bulk[obj].bfcleanliness != 0) { errors.push("No Body Frame Cleanliness score specified"); }
        if(!req.body.bulk[obj].modspaint && req.body.bulk[obj].modspaint != 0) { errors.push("No Mods Paint score specified"); }
        if(!req.body.bulk[obj].modsbody && req.body.bulk[obj].modsbody != 0) { errors.push("No Mods Body score specified"); }
        if(!req.body.bulk[obj].modswrap && req.body.bulk[obj].modswrap != 0) { errors.push("No Mods Wrap score specified"); }
        if(!req.body.bulk[obj].modsrims && req.body.bulk[obj].modsrims != 0) { errors.push("No Mods Rims score specified"); }
        if(!req.body.bulk[obj].modsinterior && req.body.bulk[obj].modsinterior != 0) { errors.push("No Mods Interior score specified"); }
        if(!req.body.bulk[obj].modsother && req.body.bulk[obj].modsother != 0) { errors.push("No Mods Other score specified"); }
        if(!req.body.bulk[obj].modsice && req.body.bulk[obj].modsice != 0) { errors.push("No Mods ICE score specified"); }
        if(!req.body.bulk[obj].modsaftermarket && req.body.bulk[obj].modsaftermarket != 0) { errors.push("No Mods Aftermarket score specified"); }
        if(!req.body.bulk[obj].modswip && req.body.bulk[obj].modswip != 0) { errors.push("No Mods WIP score specified"); }
        if(!req.body.bulk[obj].modsoverall && req.body.bulk[obj].modsoverall != 0) { errors.push("No Mods Overall specified"); }

        // indicate any errors
        if(errors.length) {
            res.status(400).json({"error": errors.join(",")});
            return;
        }

        // increment the counter of the number of objects to insert
        numObjsToInsert++;

        // push each object that was passed in to the params array
        params.push(req.body.bulk[obj].carid, req.body.bulk[obj].year, req.body.bulk[obj].make, req.body.bulk[obj].model,
            req.body.bulk[obj].racerturbo, req.body.bulk[obj].racersupercharged, req.body.bulk[obj].racerperformance, req.body.bulk[obj].racerhorsepower,
            req.body.bulk[obj].caroverall, req.body.bulk[obj].enginemodifications, req.body.bulk[obj].engineperformance, req.body.bulk[obj].enginechrome, req.body.bulk[obj].enginedetailing, req.body.bulk[obj].enginecleanliness,
            req.body.bulk[obj].bfundercarriage, req.body.bulk[obj].bfsuspension, req.body.bulk[obj].bfchrome, req.body.bulk[obj].bfdetailing, req.body.bulk[obj].bfcleanliness,
            req.body.bulk[obj].modspaint, req.body.bulk[obj].modsbody, req.body.bulk[obj].modswrap, req.body.bulk[obj].modsrims, req.body.bulk[obj].modsinterior, req.body.bulk[obj].modsother, req.body.bulk[obj].modsice, req.body.bulk[obj].modsaftermarket, req.body.bulk[obj].modswip, req.body.bulk[obj].modsoverall)

    }

    // modify the sql command to allow for the number of objects that were passed in
    for(var i=0; i<numObjsToInsert-1; i++) {
        sql += ", (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    }

    db.run(sql, params, function(err, result) {

        // error checking
        if(err) {
            res.status(400).json({"error": err.message})
            return;
        }

        // successful execution
        res.json({
            "message": "success",
            "data": params,
            "id": this.lastID
        })
    });
});

// endpoint to add a new owner/new owners
// multiple owners can be added as JSON objects
app.post("/owners/", (req, res, next) => {

        // initialize the sql command, the parameter array, and a counter for the number of objects to insert
        var sql = "INSERT INTO Owners (Car_ID, Name, Email) VALUES (?, ?, ?)"
        params = [];
        let numObjsToInsert = 0;

        // loop through the request body that was passed in
        for(var obj in req.body.bulk) {

            // create an array of potential errors
            var errors = []
            if(!req.body.bulk[obj].carid && req.body.bulk[obj].carid != 0) { errors.push("No Car ID specified"); }
            if(!req.body.bulk[obj].name) { errors.push("No Name specified"); }
            if(!req.body.bulk[obj].email) { errors.push("No Email specified"); }

            // indicate any errors
            if(errors.length) {
                res.status(400).json({"error": errors.join(",")});
                return;
            }

            // increment the counter of the number of objects to insert
            numObjsToInsert++;

            // push each object that was passed in to the params array
            params.push(req.body.bulk[obj].carid, req.body.bulk[obj].name, req.body.bulk[obj].email)

        }

        // modify the sql command to allow for the number of objects that were passed in
        for(var i=0; i<numObjsToInsert-1; i++) {
            sql += ", (?, ?, ?)"
        }

        db.run(sql, params, function(err, result) {

            // error checking
            if(err) {
                res.status(400).json({"error": err.message})
                return;
            }

            // successful execution
            res.json({
                 "message": "success",
                 "data": params,
                 "id": this.lastID
            })

        });
});

app.patch("/cars/", (req, res, next) => {

    // create data object
    var data = {
        carid1: req.body.carid1,
        year1: req.body.year1,
        make1: req.body.make1,
        model1: req.body.model1,
        racerturbo1: req.body.racerturbo1,
        racersupercharged1: req.body.racersupercharged1,
        racerperformance1: req.body.racerperformance1,
        racerhorsepower1: req.body.racerhorsepower1,
        caroverall1: req.body.caroverall1,
        enginemodifications1: req.body.enginemodifications1,
        engineperformance1: req.body.engineperformance1,
        enginechrome1: req.body.enginechrome1,
        enginedetailing1: req.body.enginedetailing1,
        enginecleanliness1: req.body.enginecleanliness1,
        bfundercarriage1: req.body.bfundercarriage1,
        bfsuspension1: req.body.bfsuspension1,
        bfchrome1: req.body.bfchrome1,
        bfdetailing1: req.body.bfdetailing1,
        bfcleanliness1: req.body.bfcleanliness1,
        modspaint1: req.body.modspaint1,
        modsbody1: req.body.modsbody1,
        modswrap1: req.body.modswrap1,
        modsrims1: req.body.modsrims1,
        modsinterior1: req.body.modsinterior1,
        modsother1: req.body.modsother1,
        modsice1: req.body.modsice1,
        modsaftermarket1: req.body.modsaftermarket1,
        modswip1: req.body.modswip1,
        modsoverall1: req.body.modsoverall1,
        carid2: req.query.carid2,
        year2: req.query.year2,
        make2: req.query.make2,
        model2: req.query.model2,
        racerturbo2: req.query.racerturbo2,
        racersupercharged2: req.query.racersupercharged2,
        racerperformance2: req.query.racerperformance2,
        racerhorsepower2: req.query.racerhorsepower2,
        caroverall2: req.query.caroverall2,
        enginemodifications2: req.query.enginemodifications2,
        engineperformance2: req.query.engineperformance2,
        enginechrome2: req.query.enginechrome2,
        enginedetailing2: req.query.enginedetailing2,
        enginecleanliness2: req.query.enginecleanliness2,
        bfundercarriage2: req.query.bfundercarriage2,
        bfsuspension2: req.query.bfsuspension2,
        bfchrome2: req.query.bfchrome2,
        bfdetailing2: req.query.bfdetailing2,
        bfcleanliness2: req.query.bfcleanliness2,
        modspaint2: req.query.modspaint2,
        modsbody2: req.query.modsbody2,
        modswrap2: req.query.modswrap2,
        modsrims2: req.query.modsrims2,
        modsinterior2: req.query.modsinterior2,
        modsother2: req.query.modsother2,
        modsice2: req.query.modsice2,
        modsaftermarket2: req.query.modsaftermarket2,
        modswip2: req.query.modswip2,
        modsoverall2: req.query.modsoverall2
    }

    // initialize the sql command and the parameter array
    // COALESCE allows the user to update some fields and leave others with their initial values
    var sql = `UPDATE Cars SET Car_ID = COALESCE(?, Car_ID), Year = COALESCE(?, Year), Make = COALESCE(?, Make), Model = COALESCE(?, Model),
    Racer_Turbo = COALESCE(?, Racer_Turbo), Racer_Supercharged = COALESCE(?, Racer_Supercharged), Racer_Performance = COALESCE(?, Racer_Performance), Racer_Horsepower = COALESCE(?, Racer_Horsepower),
    Car_Overall = COALESCE(?, Car_Overall), Engine_Modifications = COALESCE(?, Engine_Modifications), Engine_Performance = COALESCE(?, Engine_Performance), Engine_Chrome = COALESCE(?, Engine_Chrome), Engine_Detailing = COALESCE(?, Engine_Detailing), Engine_Cleanliness = COALESCE(?, Engine_Cleanliness),
    Body_Frame_Undercarriage = COALESCE(?, Body_Frame_Undercarriage), Body_Frame_Suspension = COALESCE(?, Body_Frame_Suspension), Body_Frame_Chrome = COALESCE(?, Body_Frame_Chrome), Body_Frame_Detailing = COALESCE(?, Body_Frame_Detailing), Body_Frame_Cleanliness = COALESCE(?, Body_Frame_Cleanliness),
    Mods_Paint = COALESCE(?, Mods_Paint), Mods_Body = COALESCE(?, Mods_Body), Mods_Wrap = COALESCE(?, Mods_Wrap), Mods_Rims = COALESCE(?, Mods_Rims), Mods_Interior = COALESCE(?, Mods_Interior), Mods_Other = COALESCE(?, Mods_Other), Mods_ICE = COALESCE(?, Mods_ICE), Mods_Aftermarket = COALESCE(?, Mods_Aftermarket), Mods_WIP = COALESCE(?, Mods_WIP), Mods_Overall = COALESCE(?, Mods_Overall)
    WHERE Car_ID = COALESCE(?, Car_ID) AND Year = COALESCE(?, Year) AND Make = COALESCE(?, Make) AND Model = COALESCE(?, Model)
    AND Racer_Turbo = COALESCE(?, Racer_Turbo) AND Racer_Supercharged = COALESCE(?, Racer_Supercharged) AND  Racer_Performance = COALESCE(?, Racer_Performance) AND Racer_Horsepower = COALESCE(?, Racer_Horsepower)
    AND Car_Overall = COALESCE(?, Car_Overall) AND Engine_Modifications = COALESCE(?, Engine_Modifications) AND Engine_Performance = COALESCE(?, Engine_Performance) AND Engine_Chrome = COALESCE(?, Engine_Chrome) AND Engine_Detailing = COALESCE(?, Engine_Detailing) AND Engine_Cleanliness = COALESCE(?, Engine_Cleanliness) AND
    Body_Frame_Undercarriage = COALESCE(?, Body_Frame_Undercarriage) AND Body_Frame_Suspension = COALESCE(?, Body_Frame_Suspension) AND Body_Frame_Chrome = COALESCE(?, Body_Frame_Chrome) AND Body_Frame_Detailing = COALESCE(?, Body_Frame_Detailing) AND Body_Frame_Cleanliness = COALESCE(?, Body_Frame_Cleanliness) AND
    Mods_Paint = COALESCE(?, Mods_Paint) AND Mods_Body = COALESCE(?, Mods_Body) AND Mods_Wrap = COALESCE(?, Mods_Wrap) AND Mods_Rims = COALESCE(?, Mods_Rims) AND Mods_Interior = COALESCE(?, Mods_Interior) AND Mods_Other = COALESCE(?, Mods_Other) AND Mods_ICE = COALESCE(?, Mods_ICE) AND Mods_Aftermarket = COALESCE(?, Mods_Aftermarket) AND Mods_WIP = COALESCE(?, Mods_WIP) AND Mods_Overall = COALESCE(?, Mods_Overall)`;
    var params = [data.carid1, data.year1, data.make1,
        data.model1, data.racerturbo1, data.racersupercharged1, data.racerperformance1, data.racerhorsepower1,
        data.caroverall1, data.enginemodifications1, data.engineperformance1, data.enginechrome1, data.enginedetailing1, data.enginecleanliness1,
        data.bfundercarriage1, data.bfsuspension1, data.bfchrome1, data.bfdetailing1, data.bfcleanliness1,
        data.modspaint1, data.modsbody1, data.modswrap1, data.modsrims1, data.modsinterior1, data.modsother1, data.modsice1, data.modsaftermarket1, data.modswip1, data.modsoverall1,
        data.carid2, data.year2, data.make2, data.model2,
        data.racerturbo2, data.racersupercharged2, data.racerperformance2, data.racerhorsepower2,
        data.caroverall2, data.enginemodifications2, data.engineperformance2, data.enginechrome2, data.enginedetailing2, data.enginecleanliness2,
        data.bfundercarriage2, data.bfsuspension2, data.bfchrome2, data.bfdetailing2, data.bfcleanliness2,
        data.modspaint2, data.modsbody2, data.modswrap2, data.modsrims2, data.modsinterior2, data.modsother2, data.modsice2, data.modsaftermarket2, data.modswip2, data.modsoverall2];

    db.run(sql, params, function(err) {

        // error checking
        if(err) {
            return console.error(err.message);
        }

        // print message to console indicating how many changes occurred
        console.log(`Row(s) updated: ${this.changes}`);
    });

    // successful execution
    res.json({
        message: "success",
        data: data,
        changes: this.changes
    })
})

// endpoint to update a car using the Car ID as a parameter
app.patch("/cars/:carid", (req, res, next) => {

    // create data object
    var data = {
        year: req.body.year,
        make: req.body.make,
        model: req.body.model,
        racerturbo: req.body.racerturbo,
        racersupercharged: req.body.racersupercharged,
        racerperformance: req.body.racerperformance,
        racerhorsepower: req.body.racerhorsepower,
        caroverall: req.body.caroverall,
        enginemodifications: req.body.enginemodifications,
        engineperformance: req.body.engineperformance,
        enginechrome: req.body.enginechrome,
        enginedetailing: req.body.enginedetailing,
        enginecleanliness: req.body.enginecleanliness,
        bfundercarriage: req.body.bfundercarriage,
        bfsuspension: req.body.bfsuspension,
        bfchrome: req.body.bfchrome,
        bfdetailing: req.body.bfdetailing,
        bfcleanliness: req.body.bfcleanliness,
        modspaint: req.body.modspaint,
        modsbody: req.body.modsbody,
        modswrap: req.body.modswrap,
        modsrims: req.body.modsrims,
        modsinterior: req.body.modsinterior,
        modsother: req.body.modsother,
        modsice: req.body.modsice,
        modsaftermarket: req.body.modsaftermarket,
        modswip: req.body.modswip,
        modsoverall: req.body.modsoverall,
        carid: req.params.carid
    }

    // initialize the sql command and the parameter array
    // COALESCE allows the user to update some fields and leave others with their initial values
    var sql = `UPDATE Cars SET Year = COALESCE(?, Year), Make = COALESCE(?, Make), Model = COALESCE(?, Model),
    Racer_Turbo = COALESCE(?, Racer_Turbo), Racer_Supercharged = COALESCE(?, Racer_Supercharged), Racer_Performance = COALESCE(?, Racer_Performance), Racer_Horsepower = COALESCE(?, Racer_Horsepower),
    Car_Overall = COALESCE(?, Car_Overall), Engine_Modifications = COALESCE(?, Engine_Modifications), Engine_Performance = COALESCE(?, Engine_Performance), Engine_Chrome = COALESCE(?, Engine_Chrome), Engine_Detailing = COALESCE(?, Engine_Detailing), Engine_Cleanliness = COALESCE(?, Engine_Cleanliness),
    Body_Frame_Undercarriage = COALESCE(?, Body_Frame_Undercarriage), Body_Frame_Suspension = COALESCE(?, Body_Frame_Suspension), Body_Frame_Chrome = COALESCE(?, Body_Frame_Chrome), Body_Frame_Detailing = COALESCE(?, Body_Frame_Detailing), Body_Frame_Cleanliness = COALESCE(?, Body_Frame_Cleanliness),
    Mods_Paint = COALESCE(?, Mods_Paint), Mods_Body = COALESCE(?, Mods_Body), Mods_Wrap = COALESCE(?, Mods_Wrap), Mods_Rims = COALESCE(?, Mods_Rims), Mods_Interior = COALESCE(?, Mods_Interior), Mods_Other = COALESCE(?, Mods_Other), Mods_ICE = COALESCE(?, Mods_ICE), Mods_Aftermarket = COALESCE(?, Mods_Aftermarket), Mods_WIP = COALESCE(?, Mods_WIP), Mods_Overall = COALESCE(?, Mods_Overall)
    WHERE Car_ID = ?`;
    var params = [data.year, data.make, data.model,
        data.racerturbo, data.racersupercharged, data.racerperformance, data.racerhorsepower,
        data.caroverall, data.enginemodifications, data.engineperformance, data.enginechrome, data.enginedetailing, data.enginecleanliness,
        data.bfundercarriage, data.bfsuspension, data.bfchrome, data.bfdetailing, data.bfcleanliness,
        data.modspaint, data.modsbody, data.modswrap, data.modsrims, data.modsinterior, data.modsother, data.modsice, data.modsaftermarket, data.modswip, data.modsoverall,
        data.carid];

    db.run(sql, params, function(err) {

        // error checking
        if(err) {
            return console.error(err.message);
        }

        // print message to console indicating how many changes occurred
        console.log(`Row(s) updated: ${this.changes}`);
    });

    // successful execution
    res.json({
        message: "success",
        data: data,
        changes: this.changes
    })
})

// endpoint to update an owner/multiple owners
app.patch("/owners/", (req, res, next) => {

    // create data object
    // carid1, name1, and email1 are values being updated
    // carid2, name2, and email2 are query parameters
    var data = {
        carid1: req.body.carid1,
        name1: req.body.name1,
        email1: req.body.email1,
        carid2: req.query.carid2,
        name2: req.query.name2,
        email2: req.query.email2
    }

    // initialize the sql command and the parameter array
    // COALESCE allows the user to update some fields and leave others with their initial values
    var sql = `UPDATE Owners SET Car_ID = COALESCE(?, Car_ID), Name = COALESCE(?, Name), Email = COALESCE(?, Email) WHERE Car_ID = COALESCE(?, Car_ID) AND Name = COALESCE(?, Name) AND Email = COALESCE(?, Email)`;
    var params = [data.carid1, data.name1, data.email1, data.carid2, data.name2, data.email2];

    db.run(sql, params, function(err) {

        // error checking
        if(err) {
            return console.error(err.message);
        }

        // print message to console indicating how many changes occurred
        console.log(`Row(s) updated: ${this.changes}`);
    });

    // successful execution
    res.json({
        message: "success",
        data: data,
        changes: this.changes
    })
})

// endpoint to update an owner using the car id as a parameter
app.patch("/owners/:carid", (req, res, next) => {

    // create data object
    var data = {
        name: req.body.name,
        email: req.body.email,
        carid: req.params.carid
    }

    // initialize the sql command and the parameter array
    // COALESCE allows the user to update some fields and leave others with their initial values
    var sql = `UPDATE Owners SET Name = COALESCE(?, Name), Email = COALESCE(?, Email) WHERE Car_ID = ?`;
    var params = [data.name, data.email, data.carid];

    db.run(sql, params, function(err) {

        // error checking
        if(err) {
            return console.error(err.message);
        }

        //print message to console indicating how many changes occurred
        console.log(`Row(s) updated: ${this.changes}`);
    });

    // successful execution
    res.json({
        message: "success",
        data: data,
        changes: this.changes
    })
})
