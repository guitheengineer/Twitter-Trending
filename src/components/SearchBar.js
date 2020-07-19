/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import Autocomplete from "react-autocomplete";
import { countries } from "../CountriesList";
import { dispatchContext, globalData } from "../Context";

export default function SearchBar() {
  const dispatch = useContext(dispatchContext);
  const { input, width } = useContext(globalData);

  // Hook to deal with country being fetched
  useEffect(() => {
    let countryMatched;
    countries.find(inputTypeExists);
    function inputTypeExists(el) {
      if (input === "") {
        return (countryMatched = "Worldwide");
      }
      if (
        el.name.toLowerCase().startsWith(input.toLowerCase().charAt(0)) &&
        el.name.toLowerCase().includes(input.toLowerCase())
      ) {
        console.log(input);
        return (countryMatched = el.name);
      }
    }

    dispatch({
      type: "SET_CURRENT_COUNTRY",
      payload: countryMatched,
    });
  }, [input]);

  function searchBarStyling(isHighlighted) {
    return {
      font: "1.3rem Roboto",
      backgroundColor: isHighlighted ? "#EDEDED" : "transparent",
      borderBottom: "1px solid #E6E6EC",
      padding: "1rem 1.5rem",
    };
  }
  function menuStyle() {
    let commonStyle = {
      borderRadius: "0 0 1.5rem 1.5rem",
      width: "10%",
      boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
      background: "rgba(255, 255, 255, 0.9)",
      padding: "0px 0",
      fontSize: "90%",
      position: "absolute",
      overflow: "auto",
      zIndex: "999999",
    };
    if (width > 592)
      return {
        ...commonStyle,
        maxHeight: "500%",
        left: "1.5rem",
      };
    else
      return {
        ...commonStyle,
        maxHeight: "200%",
        left: "2.5rem",
      };
  }

  return (
    <div className="App__location">
      <Autocomplete
        items={countries}
        shouldItemRender={(item, value) =>
          item.name.toLowerCase().startsWith(value.toLowerCase().charAt(0)) &&
          item.name.toLowerCase().indexOf(value.toLowerCase()) > -1 &&
          item.name !== ""
        }
        getItemValue={(item) => item.name}
        inputProps={{
          placeholder: `${input === "" || undefined ? "Worldwide" : input}`,
        }}
        renderItem={(item, isHighlighted) => (
          <div key={item.name} style={searchBarStyling(isHighlighted)}>
            {item.name}
          </div>
        )}
        value={input}
        onChange={(e) => {
          dispatch({
            type: "SET_INPUT",
            payload: e.target.value,
          });
        }}
        onSelect={(e) =>
          dispatch({
            type: "SET_INPUT",
            payload: e,
          })
        }
        menuStyle={menuStyle()}
      />
      <img
        src="./Searchicon.svg"
        alt="change trends time"
        className="App__location--image"
      ></img>
    </div>
  );
}
