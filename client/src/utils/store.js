import React, { createContext, useReducer } from "react";
import dayjs from "dayjs";
const initialState = {
  selectedDate: dayjs().format("YYYY-MM-DD"),
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "SET_DATE":
        return {
          ...state,
          selectedDate: action.payload,
        };
      default:
        return state;
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
