/*

*/

import React, { useEffect } from "react";
import "./App.css";
import fetchData from "./fetchData";
import SearchBar from "./components/SearchBar";
import { countries } from "./CountriesList";
import { useContext } from "react";
import { dispatchContext, globalData } from "./Context";
import TopicsContainer from "./components/TopicsContainer";
import ErrorHandler from "./components/ErrorHandler";

function App() {
  const dispatch = useContext(dispatchContext);
  const data = useContext(globalData);
  const { width, height, input, currentTrendingCountry, quantityTrends } = data;

  useEffect(() => {
    dispatch({
      type: "SET_DIMENSIONS",
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, [width, height]);

  useEffect(() => {
    const inputCapitalize = input
      .toLowerCase()
      .split(" ")
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(" ");

    let countryMatched;
    countries.find(inputTypeExists);
    function inputTypeExists(el) {
      if (input === "") {
        return (countryMatched = "Worldwide");
      }
      if (el.name.includes(inputCapitalize)) {
        return (countryMatched = el.name);
      }
    }

    dispatch({ type: "SET_CURRENT_COUNTRY", payload: countryMatched });
  }, [input]);

  useEffect(() => {
    fetchData(dispatch, data);
  }, [currentTrendingCountry, quantityTrends]);

  return (
    <div className="App">
      <SearchBar />
      <TopicsContainer />
      <ErrorHandler />
    </div>
  );
}

export default App;
