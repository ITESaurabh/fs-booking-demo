var sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "./fake.db";

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to the SQLite database.");
    db.run(
      `CREATE TABLE users(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email text UNIQUE, password TEXT, CONSTRAINT email_unique UNIQUE (email))`,
      (err) => {
        if (err) {
          // Table already created
          console.log("users table already exist");
        } else {
          // Table just created, creating some rows
          var insert =
            "INSERT INTO users(name, email, password) VALUES (?,?,?)";
          db.run(insert, ["John Doe", "asd@mail.com", "123"]);
          db.run(insert, ["user", "user@example.com", "456"]);
        }
      }
    );

    db.run(
      `CREATE TABLE hotels(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, picture TEXT)`,
      (err) => {
        if (err) {
          console.log("hotels table already exist");
          // Table already created
        } else {
          // Table just created, creating some rows
          var insert = "INSERT INTO hotels(name, picture) VALUES(?, ?)";
          db.run(insert, ["Hotel 1", "https://via.placeholder.com/720x480"]);
          db.run(insert, ["Hotel 2", "https://via.placeholder.com/720x480"]);
          db.run(insert, ["Hotel 3", "https://via.placeholder.com/720x480"]);
          db.run(insert, ["Hotel 4", "https://via.placeholder.com/720x480"]);
          db.run(insert, ["Hotel 5", "https://via.placeholder.com/720x480"]);
          db.run(insert, ["Hotel 6", "https://via.placeholder.com/720x480"]);
          db.run(insert, ["Hotel 7", "https://via.placeholder.com/720x480"]);
          db.run(insert, ["Hotel 8", "https://via.placeholder.com/720x480"]);
        }
      }
    );

    db.run(
      `CREATE TABLE booking(id INTEGER PRIMARY KEY AUTOINCREMENT, user_id, hotel_id, booking_date DATE, transaction_date DATE)`,
      (err) => {
        if (err) {
          // Table already created
        } else {
          // Table just created, creating some rows
          var insert =
            "INSERT INTO booking(user_id, hotel_id, booking_date, transaction_date) VALUES (?,?,?,?)";
          // db.run(insert, [1, "20-21-2023", "20-04-2022", "123"]);
          // db.run(insert, ["user", "user@example.com", "456"]);
        }
      }
    );
  }
});

module.exports = db;
