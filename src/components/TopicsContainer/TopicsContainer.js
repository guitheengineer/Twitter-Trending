import React, { useContext } from "react";
import { globalData } from "../../Context";
import format from "../../RoundingNumbers";
import TitleArea from "./TitleArea/TitleArea";

export default function TopicsContainer() {
  const data = useContext(globalData);
  const { isError, currentTrendingCountry, trendList } = data;

  return (
    <div className="App__container">
      <TitleArea />
      {currentTrendingCountry !== undefined && !isError && (
        <ol className="App__container--list">
          {trendList.map((tE, index) => (
            <li key={tE.name} className="App__container--list--item">
              <span
                className="App__container--list--item--number"
                // Maintain trends alignment
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
                {/* Short long trending topics */}
                {tE.name.length >= 19 ? `${tE.name.slice(0, 19)}...` : tE.name}
              </span>
              <p className="App__container--list--item--quantity">
                {format(tE.tweet_volume)} tweets
              </p>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
