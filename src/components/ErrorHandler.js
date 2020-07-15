import React, { useContext } from "react";
import { globalData } from "../Context";
function ErrorHandler() {
  const { currentTrendingCountry, height, isError, isLoading } = useContext(
    globalData
  );

  return (
    <>
      {currentTrendingCountry === undefined && !isLoading && (
        <span
          style={{
            transform:
              height <= 220
                ? "translate(-50%, 87%)"
                : height <= 420
                ? "translate(-50%, 65%)"
                : "translate(-50%, -50%)",
          }}
          className="App__errormessage"
        >
          Please, check if the name of the country you are looking for it's
          correct.
        </span>
      )}
      {currentTrendingCountry !== undefined && isError && (
        <span
          className="App__errormessage"
          style={{
            transform:
              height <= 220
                ? "translate(-50%, 87%)"
                : height <= 420
                ? "translate(-50%, 65%)"
                : "translate(-50%, -50%)",
          }}
        >
          An error has ocurred <br />
          Try again clicking in the refresh icon.
        </span>
      )}
      ;
    </>
  );
}

export default ErrorHandler;
