import React, { useContext } from "react";
import { dispatchContext, globalData } from "../Context";
import fetchData from "../fetchData";
import format from "../RoundingNumbers";
import ClipLoader from "react-spinners/ClipLoader";

export default function TopicsContainer() {
  const dispatch = useContext(dispatchContext);
  const data = useContext(globalData);
  const {
    isLoading,
    isError,
    countryExists,
    currentTrendingCountry,
    trendList,
    quantityTrends,
  } = data;
  return (
    <div className="App__container">
      <span className="App__container--title">
        <span
          style={{
            borderBottomWidth:
              isLoading || isError || countryExists
                ? "0px !important"
                : "1px !important",
          }}
        >
          {currentTrendingCountry === undefined
            ? "Error"
            : currentTrendingCountry === ""
            ? "Worldwide Trends"
            : `${currentTrendingCountry} Trends`}
        </span>
        {isError && (
          <img
            onClick={() => fetchData(dispatch, data)}
            alt="Refresh"
            src="./Refreshicon.svg"
            className="App__container--refresh"
          ></img>
        )}
        <ClipLoader
          css={`
            margin-left: 6px;
            border-radius: 100%;
            border: 1px solid;
            border-color: #000000;
            border-bottom-color: transparent;
            display: inline-block;
            -webkit-animation: animation-s8tf20 0.75s 0s infinite linear;
            animation: animation-s8tf20 0.75s 0s infinite linear;
            animation-fill-mode: none;
            -webkit-animation-fill-mode: both;
            animation-fill-mode: both;
          `}
          size={14}
          loading={isLoading}
        />
      </span>

      {countryExists && !isError && (
        <ol className="App__container--list">
          {trendList.map((tE, index) => (
            <li key={tE.name} className="App__container--list--item">
              <span
                className="App__container--list--item--number"
                style={{ marginLeft: index + 1 >= 10 ? "-2.5rem" : "-2rem" }}
              >
                {index + 1}
              </span>
              <span
                className="App__container--list--item--topic"
                onClick={() => {
                  window.open(tE.url);
                }}
              >
                {tE.name.length >= 19 ? `${tE.name.slice(0, 19)}...` : tE.name}
              </span>
              <p className="App__container--list--item--quantity">
                {format(tE.tweet_volume)} tweets
              </p>
            </li>
          ))}
        </ol>
      )}
      {countryExists && !isLoading && !isError && (
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
    </div>
  );
}
