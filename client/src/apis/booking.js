import request from "../utils/request";

export function getMyBookings(params) {
  return request({
    url: "booking/my",
    method: "get",
    params,
  });
}

export function createBooking(data) {
  return request({
    url: "booking/new",
    method: "post",
    data,
  });
}
