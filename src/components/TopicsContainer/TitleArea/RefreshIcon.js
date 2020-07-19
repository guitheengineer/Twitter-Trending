import React, { useContext } from "react";
import { globalData, dispatchContext } from "../../../Context";
import fetchData from "../../../fetchData";
export default function RefreshIcon() {
  const dispatch = useContext(dispatchContext);
  const data = useContext(globalData);
  const { isError } = data;
  return (
    isError && (
      <img
        onClick={() => fetchData(dispatch, data)}
        alt="Refresh"
        src="./Refreshicon.svg"
        className="App__container--refresh"
      ></img>
    )
  );
}
