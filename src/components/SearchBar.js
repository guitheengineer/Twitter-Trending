import React from "react";
import Autocomplete from "react-autocomplete";
import { countries } from "../CountriesList";
import { useContext } from "react";
import { dispatchContext, globalData } from "../Context";

export default function SearchBar() {
  const dispatch = useContext(dispatchContext);
  const { input, width } = useContext(globalData);

  function searchBarStyling(isHighlighted) {
    let commonStyle = {
      font: "1.3rem Roboto",
      backgroundColor: isHighlighted ? "#EDEDED" : "transparent",
      borderBottom: "1px solid #E6E6EC",
    };
    if (width > 562)
      return {
        ...commonStyle,
        padding: "1rem 1.5rem",
      };
    else return { ...commonStyle, padding: "1rem 1.5rem" };
  }
  function menuStyle() {
    let commonStyle = {
      borderRadius: "0 0 1.5rem 1.5rem",
      width: "10%",
      boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
      background: "rgba(255, 255, 255, 0.9)",
      padding: "0px 0",
      fontSize: "90%",
      position: "fixed",
      overflow: "auto",
      zIndex: "999999",
    };
    if (width > 592)
      return {
        ...commonStyle,
        maxHeight: "50%",
        left: "1.5rem",
      };
    else
      return {
        ...commonStyle,
        maxHeight: "100%",
        left: "2.5rem",
      };
  }

  return (
    <div className="App__location">
      <Autocomplete
        items={countries}
        shouldItemRender={(item, value) =>
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
        onSelect={(e) => dispatch({ type: "SET_INPUT", payload: e })}
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
