const express = require("express");
require("dotenv").config();
const mysql = require("mysql");
const bodyparser = require("body-parser");

const app = express();

app.use(bodyparser.json());

const db = mysql.createConnection({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: "bus_manage_system",
  multipleStatements: true,
});

// app.get('/insert', (req, res) => {

//     db.query('INSERT INTO fromto (Bus_id, Bus_name, Date, Departure, Arrival, NumberOfSeats, Bus_fare) VALUES ?', (err, result) => {
//         //
//     })
// })

// Database connection
db.connect((err) => {
  if (!err) {
    console.log(" Database Connection Successful");
  } else {
    console.log("Error:" + JSON.stringify(err, undefined, 2));
  }
});

//connecting to server
app.listen(3001, () => {
  console.log(`Server Running on Port 3001`);
});

//get all buses from db
app.get("/buses", (req, res) => {
  db.query("SELECT * FROM fromto", (err, rows, fields) => {
    if (!err) {
      // console.log(rows)
      res.send(rows);
    } else {
      console.log(err);
    }
  });
});

//get a bus
app.get("/buses/:id", (req, res) => {
  db.query(
    "SELECT * FROM fromto WHERE Bus_id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) {
        // console.log(rows)
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

//deleting a bus
app.delete("/buses/:id", (req, res) => {
  db.query(
    "DELETE FROM fromto WHERE Bus_id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) {
        // console.log(rows)
        res.send("Deleted Successfully!");
      } else {
        console.log(err);
      }
    }
  );
});

//inserting a bus
app.post("/buses", (req, res) => {
  let bus = req.body;
  const insert =
    "SET @Bus_id = ?; SET @Bus_name = ?; SET @Date = ?; SET @Departure = ?; SET @Arrival = ?; SET @NumberOfSeats = ?; SET @Bus_fare = ?;\
     CALL busAddOrUpdate(@Bus_id, @Bus_name, @Date, @Departure, @Arrival, @NumberOfSeats, @Bus_fare);";
  db.query(
    insert,
    [
      bus.Bus_id,
      bus.Bus_name,
      bus.Date,
      bus.Departure,
      bus.Arrival,
      bus.NumberOfSeats,
      bus.Bus_fare,
    ],
    (err, rows, fields) => {
      if (!err) {
        // console.log(rows)
        // res.send(rows)
        rows.forEach((element) => {
          if (element.constructor == Array) {
            res.send("Inserted Bus with ID: " + element[0].Bus_id);
          }
        });
      } else {
        console.log(err);
      }
    }
  );
});

//updating details of a bus
app.put("/buses", (req, res) => {
  let bus = req.body;
  const insert =
    "SET @Bus_id = ?; SET @Bus_name = ?; SET @Date = ?; SET @Departure = ?; SET @Arrival = ?; SET @NumberOfSeats = ?; SET @Bus_fare = ?;\
     CALL busAddOrUpdate(@Bus_id, @Bus_name, @Date, @Departure, @Arrival, @NumberOfSeats, @Bus_fare);";
  db.query(
    insert,
    [
      bus.Bus_id,
      bus.Bus_name,
      bus.Date,
      bus.Departure,
      bus.Arrival,
      bus.NumberOfSeats,
      bus.Bus_fare,
    ],
    (err, rows, fields) => {
      if (!err) {
        // console.log(rows)
        // res.send(rows)
        res.send("Updated Successfully!");
      } else {
        console.log(err);
      }
    }
  );
});