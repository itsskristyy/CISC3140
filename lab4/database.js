const csvtojson = require("csvtojson");
const sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "db.sqlite"
CSV_PATH = "data_4/data.csv"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE cars
                (
                    car_id INT PRIMARY KEY,
                    owner  STRING,
                    email  STRING,
                    make   STRING,
                    model  STRING,
                    year   INT,
                    score  INT
                )`,
            (err) => {
                if (err) {
                    // Table already created
                } else {
                    csvtojson().fromFile(CSV_PATH)
                        .then(data => {
                            let insert = 'INSERT INTO cars (car_ID, owner, email, make, model, year, score) VALUES (?,?,?,?,?,?,?)';

                            for (const car of data) {
                                db.run(insert, [
                                    car.Car_ID, car.Name, car.Email, car.Make, car.Model, car.Year, [parseInt(car.Racer_Turbo) + parseInt(car.Racer_Supercharged) + parseInt(car.Racer_Performance) +
                                    parseInt(car.Racer_Horsepower) + parseInt(car.Car_Overall) + parseInt(car.Engine_Modifications) + parseInt(car.Engine_Performance) +
                                    parseInt(car.Engine_Chrome) + parseInt(car.Engine_Detailing) + parseInt(car.Engine_Cleanliness) + parseInt(car.Body_Frame_Undercarriage) +
                                    parseInt(car.Body_Frame_Suspension) + parseInt(car.Body_Frame_Chrome) + parseInt(car.Body_Frame_Detailing) + parseInt(car.Body_Frame_Cleanliness) +
                                    parseInt(car.Mods_Paint) + parseInt(car.Mods_Body) + parseInt(car.Mods_Wrap) + parseInt(car.Mods_Rims) + parseInt(car.Mods_Interior) +
                                    parseInt(car.Mods_Other) + parseInt(car.Mods_ICE) + parseInt(car.Mods_Aftermarket) + parseInt(car.Mods_WIP) + parseInt(car.Mods_Overall)]
                                ]);
                            }
                        }).catch(err => {
                        // log error if any
                        console.log(err);
                    });
                }
            });
    }
});

module.exports = db
