import React, { useContext } from "react";
import { globalData } from "../../../Context";

export default function TitleCountry() {
  const { isLoading, isError, currentTrendingCountry } = useContext(globalData);
  // This function prevents that the last border will appear case something goes wrong.
  function borderWillApear() {
    if (isLoading || isError || currentTrendingCountry !== undefined) {
      return {
        borderBottomWidth: "0px !important",
      };
    }

    return {
      borderBottomWidth: "1px !important",
    };
  }
  // Return the title based on app fetch results
  function returnText() {
    if (currentTrendingCountry === undefined) {
      return "Error";
    }
    if (currentTrendingCountry === "") {
      return "Worldwide Trends";
    }
    return `${currentTrendingCountry} Trends`;
  }

  return <span style={borderWillApear()}>{returnText()}</span>;
}
