const express = require("express");
const router = express.Router();
const db = require("../../database");
const verifyToken = require("../../middleware/verifyToken");

// fetch all Booking
router.get("/", verifyToken, (req, res) => {
  const sql = "select * from booking";
  let params = [req.query.date];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

// fetch Booking by id
router.get("/my", verifyToken, (req, res) => {
  const sql =
    "select hotels.* from hotels where hotels.id in (select hotel_id from booking where user_id = ? and booking_date = ?) order by hotels.name";

  let params = [req.user.id, req.query.date];
  db.all(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: row,
    });
  });
});
//   db.all(sql, params, (err, rows) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       return;
//     }
//     // console.log(rows);
//     db.each(getHotel, [row.hotel_id], (err, hotel) => {
//       if (err) {
//         res.status(400).json({ error: err.message });
//         return;
//       }
//       row.hotel = hotel;
//     });

//     // db.run(hotelQuery, [req.userId], (err, rows) => {
//     //   if (err) {
//     //     res.status(400).json({ error: err.message });
//     //     return;
//     //   }
//     //   res.json({
//     //     message: "success",
//     //     data: rows,
//     //   });
//     // });
//     res.json({
//       message: "success",
//       data: rows,
//     });
//   });
// });

// create new Booking
router.post("/new", verifyToken, (req, res) => {
  try {
    const sql =
      "INSERT INTO booking(user_id, hotel_id, booking_date, transaction_date) VALUES (?,?,?,?)";
    let params = [
      req.user.id,
      req.body.hotel_id,
      req.body.booking_date,
      req.body.transaction_date,
    ];
    db.run(sql, params, function (err, result) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: "success",
        data: result,
      });
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
