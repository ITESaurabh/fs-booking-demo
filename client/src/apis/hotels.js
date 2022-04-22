import request from "../utils/request";

export function getHotels(params) {
  return request({
    url: "hotels",
    method: "get",
    params,
  });
}