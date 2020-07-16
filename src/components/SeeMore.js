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
    <>
      {currentTrendingCountry !== undefined && !isLoading && !isError && (
        <span
          className="App__seemore"
          onClick={() => dispatch({ type: "SET_QUANTITY_TRENDS" })}
        >
          {quantityTrends >= 50 ? <span></span> : <span>See more</span>}

          {quantityTrends < 50 && (
            <img alt="expand" src="./Arrowdownsee.svg"></img>
          )}
        </span>
      )}
    </>
  );
}

export default SeeMore;
