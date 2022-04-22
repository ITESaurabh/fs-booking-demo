import request from "../utils/request";

export function doLogin(data) {
  return request({
    url: "auth/login",
    method: "post",
    data,
  });
}
