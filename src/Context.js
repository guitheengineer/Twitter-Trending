import React, { useReducer } from "react";
import { createContext } from "react";

const dispatchContext = createContext();
const globalData = createContext();
export default function Context({ children }) {
  const initialState = {
    trendList: [],
    quantityTrends: 10,
    input: "",
    currentTrendingCountry: "Worldwide",
    isLoading: false,
    isError: false,

    width: 0,
    height: 0,
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_DIMENSIONS":
        return {
          ...state,
          width: action.width,
          height: action.height,
        };
      case "SET_CURRENT_COUNTRY":
        return {
          ...state,
          currentTrendingCountry: action.payload,
        };
      case "SET_INPUT":
        return {
          ...state,
          input: action.payload,
        };
      case "SET_QUANTITY_TRENDS":
        return {
          ...state,
          quantityTrends: state.quantityTrends + 5,
        };
      case "LOADING_TRUE":
        return {
          ...state,
          isLoading: true,
        };
      case "LOADING_FALSE":
        return {
          ...state,
          isLoading: false,
        };
      case "ERROR_TRUE":
        return {
          ...state,
          isError: true,
        };
      case "ERROR_FALSE":
        return {
          ...state,
          isError: false,
        };
      case "SET_TREND_LIST":
        return {
          ...state,
          trendList: action.payload,
        };
      default:
        return "default";
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <globalData.Provider value={state}>
      <dispatchContext.Provider value={dispatch}>
        {children}
      </dispatchContext.Provider>
    </globalData.Provider>
  );
}

export { globalData, dispatchContext };
