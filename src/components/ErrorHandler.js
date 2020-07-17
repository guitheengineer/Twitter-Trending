import React, { useContext } from "react";
import { globalData } from "../Context";
function ErrorHandler() {
  const { currentTrendingCountry, isError, isLoading } = useContext(globalData);

  function errorMessage() {
    if (currentTrendingCountry === undefined && !isLoading) {
      return "Please, check if the name of the country you're looking for it's correct.";
    }
    if (currentTrendingCountry !== undefined && isError) {
      return "An error has ocurred. Try again clicking in the refresh icon.";
    }
  }

  return <span className="App__errormessage">{errorMessage()}</span>;
}

export default ErrorHandler;
