/* eslint-disable eqeqeq */
import { APP_NAME, SESSION_TIME } from "../config/constants";
import Cookies from "js-cookie";

export function setAuth(auth, isRemeber) {
  Cookies.set(`${APP_NAME}_Authorization`, auth.token, {
    expires: isRemeber ? SESSION_TIME : null,
  });
  Cookies.set(`${APP_NAME}_user_id`, auth.user.id, {
    expires: isRemeber ? SESSION_TIME : null,
  });
  Cookies.set(`${APP_NAME}_user_name`, auth.user.name, {
    expires: isRemeber ? SESSION_TIME : null,
  });
  Cookies.set(`${APP_NAME}_user_email`, auth.user.email, {
    expires: isRemeber ? SESSION_TIME : null,
  });

  let userObject = {};
  userObject.token = auth.token;
  userObject.id = auth.id;
  userObject.name = auth.name;
  userObject.email = auth.email;

  return userObject;
}

export function setCurrLocation(locationObj, isRemeber) {
  Cookies.set(`${APP_NAME}_user_Location`, locationObj, {
    expires: isRemeber ? SESSION_TIME : null,
  });
  return locationObj;
}

export function getCurrLocation() {
  try {
    return JSON.parse(Cookies.get(`${APP_NAME}_user_Location`));
  } catch (error) {
    return null;
  }
}

export function setCurrLocality(locObj, isRemeber) {
  Cookies.set(`${APP_NAME}_user_Locality`, locObj, {
    expires: isRemeber ? SESSION_TIME : null,
  });
  return locObj;
}

export function getCurrLocality() {
  try {
    return JSON.parse(Cookies.get(`${APP_NAME}_user_Locality`));
  } catch (error) {
    return null;
  }
}

export function getAuth() {
  let userObject = {};
  userObject.token = Cookies.get(`${APP_NAME}_Authorization`);
  userObject.id = Cookies.get(`${APP_NAME}_user_id`);
  userObject.name = Cookies.get(`${APP_NAME}_user_name`);
  userObject.phone = Cookies.get(`${APP_NAME}_user_phone`);
  userObject.role = Cookies.get(`${APP_NAME}_user_role`);
  userObject.type = Cookies.get(`${APP_NAME}_user_type`);
  userObject.email = Cookies.get(`${APP_NAME}_user_email`);
  userObject.pic = Cookies.get(`${APP_NAME}_user_pic`);
  return userObject;
}

export function resetAuth() {
  Cookies.remove(`${APP_NAME}_Authorization`);
  Cookies.remove(`${APP_NAME}_user_id`);
  Cookies.remove(`${APP_NAME}_user_name`);
  Cookies.remove(`${APP_NAME}_user_phone`);
  Cookies.remove(`${APP_NAME}_user_role`);
  Cookies.remove(`${APP_NAME}_user_type`);
  Cookies.remove(`${APP_NAME}_user_email`);
  Cookies.remove(`${APP_NAME}_user_pic`);

  let userObject = {};

  return userObject;
}

export function validateAuth(auth) {
  let userObject = {};
  userObject.token = Cookies.get(`${APP_NAME}_Authorization`);
  userObject.id = Cookies.get(`${APP_NAME}_user_id`);
  userObject.name = Cookies.get(`${APP_NAME}_user_name`);
  userObject.phone = Cookies.get(`${APP_NAME}_user_phone`);
  userObject.role = Cookies.get(`${APP_NAME}_user_role`);
  userObject.type = Cookies.get(`${APP_NAME}_user_type`);
  if (
    userObject.token &&
    userObject.id &&
    userObject.name &&
    userObject.phone &&
    userObject.role &&
    userObject.type &&
    auth.token == userObject.token &&
    auth.id == userObject.id &&
    auth.name == userObject.name &&
    auth.phone == userObject.phone &&
    auth.role == userObject.role &&
    auth.type == userObject.type
  ) {
    return true;
  }

  return false;
}

export function setTheme(isLightTheme) {
  Cookies.set("theme_preference", isLightTheme, { expires: 365 });
  return isLightTheme === "true";
}

export function getTheme() {
  const isLightTheme = Cookies.get("theme_preference");
  // console.log(isLightTheme);
  // if (isLightTheme === undefined) {
  // }
  if (isLightTheme === "true") {
    return true;
  }
  if (isLightTheme === "false") {
    return false;
  }
  return isLightTheme;
}
