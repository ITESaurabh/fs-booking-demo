const express = require("express");
const router = express.Router();
const db = require("../../database");
const verifyToken = require("../../middleware/verifyToken");
var dayjs = require("dayjs");
// fetch all hotels
router.get("/", verifyToken, (req, res) => {
  const sql = "select * from hotels";
  const fetchBookingQuer =
    "select hotels.* from hotels where hotels.id not in (select hotel_id from booking where booking_date = ?) order by hotels.name";
  let params = [req.query.date];
  db.all(fetchBookingQuer, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });

  // const fetchBookingQuer =
  //   "select hotel_id from bookings where booking_date = ?";
  // const sql1 = "select * from hotels where hotel_id = ?";
  // const params = [];
  // db.all(sql, params, (err, result) => {
  //   if (err) {
  //     console.log(err);
  //     res.status(500).send(err);
  //   } else {
  //     const hotels = result;
  //     db.all(
  //       fetchBookingQuer,
  //       [dayjs(req.body.date).format("YYYY-MM-DD")],
  //       (err, result) => {
  //         if (err) {
  //           res.status(500).send(err);
  //         } else {
  //           const bookedHotels = result;
  //           console.log(bookedHotels);
  //           const bookedHotelsIds = bookedHotels.map((hotel) => hotel.hotel_id);
  //           hotels.forEach((hotel) => {
  //             if (bookedHotelsIds.includes(hotel.id)) {
  //               hotel.booked = true;
  //             }
  //           });
  //           res.status(200).send(hotels);
  //         }
  //       }
  //     );
  //   }
  // });
  // let params = [];
  // db.all(sql, params, (err, rows) => {
  //   if (err) {
  //     res.status(400).json({ error: err.message });
  //     return;
  //   }
  //   res.json({
  //     message: "success",
  //     data: rows,
  //   });
  // });
});

// fetch specific Hotel
router.get("/:id", verifyToken, (req, res) => {
  const sql = "select * from hotels where id = ?";
  let params = [req.params.id];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (row) {
      res.json({
        message: "success",
        data: row,
      });
    } else {
      res.json({
        message: "Hotel not found",
        success: false,
      });
    }
  });
});

module.exports = router;
