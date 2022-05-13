const express = require('express');
const router = express.Router();
const db = require("./database");

//get all cars
router.get("/", (req, res, next) => {
    const sql = "select * from cars"
    const params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "status": "success",
            "data": rows
        })
    });
});

//get cars based on id
router.get("/:id", (req, res, next) => {
    const sql = `SELECT *
                 FROM cars
                 WHERE car_id = '${req.params.id}'`
    const params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "status": "success",
            "data": rows
        })
    });
});

//get cars based on make
router.get("/make/:make", (req, res) => {
    const sql = `SELECT *
                 FROM cars
                 WHERE make = '${req.params.make}'`
    const params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "status": "success",
            "data": rows
        })
    });
});

//update owner info
router.put("/update/owner", async (req, res) => {
    console.log(req.body)
    req.body.update.forEach(data => {
        const sql = `UPDATE cars
                 SET owner = '${data.name}'
                 WHERE car_id = '${data.id}'`
        db.run(sql, (err) => {
            if (err) {
                res.status(400).json({"error": err.message});
                return;
            }
        });
    })
    res.json({
        "status": "success"
    })
});

//update email info
router.put("/update/email", async (req, res) => {
    console.log(req.body)
    req.body.update.forEach(data => {
        const sql = `UPDATE cars
                 SET email = '${data.email}'
                 WHERE car_id = '${data.id}'`
        db.run(sql, (err) => {
            if (err) {
                res.status(400).json({"error": err.message});
                return;
            }
        });
    })
    res.json({
        "status": "success"
    })
});

//create new car
router.post("/new", async (req, res) => {
    console.log(req.body)
    req.body.add.forEach(data => {
        const sql = `INSERT INTO cars (car_ID, owner, email, make, model, year, score) VALUES (${data.id},'${data.name}','${data.email}','${data.make}','${data.model}','${data.year}',${data.score});`
        db.run(sql, (err) => {
            if (err) {
                res.status(400).json({"error": err.message});
                return;
            }
        });
    })
    res.json({
        "status": "success"
    })
});

module.exports = router
