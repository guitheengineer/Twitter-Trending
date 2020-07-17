import React from "react";
import LoadingIcon from "./LoadingIcon";
import RefreshIcon from "./RefreshIcon";
import TitleCountry from "./TitleCountry";

export default function TitleArea() {
  return (
    <span className="App__container--titlearea">
      <TitleCountry>
        <RefreshIcon />
        <LoadingIcon />
      </TitleCountry>
    </span>
  );
}
