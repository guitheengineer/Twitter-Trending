import React, { useEffect, useState } from "react";
import "./App.css";
import format from "./RoundingNumbers";
import ClipLoader from "react-spinners/ClipLoader";
import { getCode, overwrite } from "country-list";
import Autocomplete from "react-autocomplete";

function App() {
  const [trendList, setTrendList] = useState([]);
  const [quantityTrends, setQuantityTrends] = useState(10);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }, [width, height]);

  useEffect(() => {
    overwrite([
      {
        code: "RU",
        name: "Russia",
      },
    ]);
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        if (input === "" || undefined) {
          const response = await fetch(`/api/trends/1`);
          const trendsData = await response.json();
          console.log(trendsData);
          setTrendList(trendsData[0].trends.slice(0, quantityTrends));
        } else {
          const response = await fetch(`/api/trends/${getCode(input)}`);
          const trendsData = await response.json();
          console.log(trendsData);
          setTrendList(trendsData[0].trends.slice(0, quantityTrends));
          console.log(trendsData);
        }
      } catch (err) {
        console.log(err);
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [quantityTrends, input]);

  return (
    <div className="App">
      <div className="App__location">
        <Autocomplete
          items={countries}
          shouldItemRender={(item, value) =>
            item.name.toLowerCase().indexOf(value.toLowerCase()) > -1
          }
          getItemValue={(item) => item.name}
          inputProps={{
            placeholder: `${input === "" || undefined ? "Worldwide" : input}`,
          }}
          renderItem={(item, isHighlighted) => (
            <div
              key={item.name}
              style={{
                backgroundColor: isHighlighted ? "#EDEDED" : "transparent",
                borderBottom: "1px solid #E6E6EC",
                padding: "1rem 2rem",
                font: "1.3rem Roboto",
              }}
            >
              {item.name}
            </div>
          )}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onSelect={(e) => setInput(e)}
          menuStyle={
            width > 592
              ? {
                  borderRadius: "0 0 1.5rem 1.5rem",
                  width: "10%",
                  boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
                  background: "rgba(255, 255, 255, 0.9)",
                  padding: "0px 0",
                  fontSize: "90%",
                  position: "fixed",
                  overflow: "auto",
                  zIndex: "999999",
                  maxHeight: "50%",
                  left: "1.5rem",
                }
              : {
                  borderRadius: "0 0 1.5rem 1.5rem",
                  width: "10%",
                  boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
                  background: "rgba(255, 255, 255, 0.9)",
                  padding: "0px 0",
                  fontSize: "90%",
                  position: "fixed",
                  overflow: "auto",
                  zIndex: "999999",
                  maxHeight: "100%",
                  left: "1.5rem",
                }
          }
        />
        <img
          src="./Searchicon.svg"
          alt="change trends time"
          className="App__location--image"
        ></img>
      </div>

      <div className="App__container">
        <span className="App__container--title">
          Trending now{" "}
          {/* <img
            src="Arrowdown.svg"
            alt="change trends time"
            className="App__container--title--image"
          ></img> */}
          {isError && (
            <img
              onClick={async () => {
                setIsError(false);
                setIsLoading(true);
                try {
                  const response = await fetch(`/api/trends/${getCode(input)}`);
                  const trendsData = await response.json();
                  setTrendList(trendsData[0].trends.slice(0, quantityTrends));
                } catch (err) {
                  console.log(err);
                  setIsError(true);
                }
                setIsLoading(false);
              }}
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
        {!isError && (
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
                  {tE.name.length >= 19
                    ? `${tE.name.slice(0, 19)}...`
                    : tE.name}
                </span>
                <p className="App__container--list--item--quantity">
                  {format(tE.tweet_volume)} tweets
                </p>
              </li>
            ))}
          </ol>
        )}
        {!isLoading && !isError && (
          <div
            className="App__seemore"
            onClick={() => {
              setQuantityTrends((prevQuantity) => prevQuantity + 5);
            }}
          >
            {quantityTrends >= 50 ? <span></span> : <span>See more</span>}

            {quantityTrends < 50 && (
              <img alt="expand" src="./Arrowdownsee.svg"></img>
            )}
          </div>
        )}
      </div>

      {isError && (
        <span
          className="App__errormessage"
          style={{
            transform:
              height <= 420 ? "translate(-50, 65%)" : "translate(-50, -50)",
          }}
        >
          An error has ocurred <br />
          Try again clicking in the refresh icon.
        </span>
      )}
    </div>
  );
}

const countries = [
  { name: "Algeria" },
  { name: "Argentina" },
  { name: "Australia" },
  { name: "Austria" },
  { name: "Bahrain" },
  { name: "Belarus" },
  { name: "Belgium" },
  { name: "Bolivia" },
  { name: "Brazil" },
  { name: "Canada" },
  { name: "Chile" },
  { name: "Colombia" },
  { name: "Denmark" },
  { name: "Dominican Republic" },
  { name: "Ecuador" },
  { name: "Egypt" },
  { name: "France" },
  { name: "Germany" },
  { name: "Ghana" },
  { name: "Greece" },
  { name: "Guatemala" },
  { name: "India" },
  { name: "Indonesia" },
  { name: "Ireland" },
  { name: "Israel" },
  { name: "Italy" },
  { name: "Japan" },
  { name: "Jordan" },
  { name: "Kenya" },
  { name: "Korea" },
  { name: "Latvia" },
  { name: "Malaysia" },
  { name: "Mexico" },
  { name: "Netherlands" },
  { name: "New Zealand" },
  { name: "Nigeria" },
  { name: "Norway" },
  { name: "Oman" },
  { name: "Pakistan" },
  { name: "Panama" },
  { name: "Peru" },
  { name: "Philippines" },
  { name: "Poland" },
  { name: "Portugal" },
  { name: "Puerto Rico" },
  { name: "Qatar" },
  { name: "Russia" },
  { name: "Saudi Arabia" },
  { name: "Singapore" },
  { name: "South Africa" },
  { name: "Spain" },
  { name: "Sweden" },
  { name: "Switzerland" },
  { name: "Thailand" },
  { name: "Turkey" },
  { name: "Ukraine" },
  { name: "United Arab Emirates" },
  { name: "United Kingdom" },
  { name: "United States" },
  { name: "Venezuela" },
  { name: "Vietnam" },
];

export default App;
