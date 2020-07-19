/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from "react";
import "./App.css";
import fetchData from "./fetchData";
import SearchBar from "./components/SearchBar";
import { dispatchContext, globalData } from "./Context";
import TopicsContainer from "./components/TopicsContainer/TopicsContainer";
import ErrorHandler from "./components/ErrorHandler";
import SeeMore from "./components/SeeMore";

function App() {
  const dispatch = useContext(dispatchContext);
  const data = useContext(globalData);
  const { width, height, currentTrendingCountry, quantityTrends } = data;

  // Hook for setting width and height app dimensions, including when user resizes the window.
  useEffect(() => {
    function setDimensions() {
      dispatch({
        type: "SET_DIMENSIONS",
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    setDimensions();
    window.addEventListener("resize", setDimensions);
    return () => window.removeEventListener("resize", setDimensions);
  }, [width, height]);

  // Hook for fetching data
  useEffect(() => {
    fetchData(dispatch, data);
  }, [currentTrendingCountry, quantityTrends]);

  return (
    <div className="App">
      <SearchBar />
      <TopicsContainer />
      <ErrorHandler />
      <SeeMore />
    </div>
  );
}

export default App;
