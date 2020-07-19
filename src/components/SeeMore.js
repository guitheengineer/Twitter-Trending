import React, { useContext } from "react";
import { dispatchContext, globalData } from "../Context";

function SeeMore() {
  const dispatch = useContext(dispatchContext);
  const {
    isLoading,
    isError,
    currentTrendingCountry,
    quantityTrends,
  } = useContext(globalData);
  return (
    currentTrendingCountry !== undefined &&
    !isLoading &&
    !isError && (
      <span
        className="App__seemore"
        onClick={() => dispatch({ type: "SET_QUANTITY_TRENDS" })}
      >
        {quantityTrends <= 50 && (
          <span>
            See more <img alt="expand" src="./Arrowdownsee.svg"></img>
          </span>
        )}
      </span>
    )
  );
}

export default SeeMore;
