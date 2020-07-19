import React, { useContext } from "react";
import { globalData } from "../../../Context";
import LoadingIcon from "./LoadingIcon";
import RefreshIcon from "./RefreshIcon";

export default function TitleCountry() {
  const { isLoading, isError, currentTrendingCountry } = useContext(globalData);
  // Prevents that the last border will appear case an error exists
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

  return (
    <span style={borderWillApear()}>
      {returnText()}
      <RefreshIcon />
      <LoadingIcon />
    </span>
  );
}
