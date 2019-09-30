import * as React from "react";
import lightbulbs from "../images/lightbulbs.svg";
import "../App.css";

export const Home: React.FC = ({}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        alignItems: "center"
      }}
    >
      <img
        src={lightbulbs}
        alt="lightbulbs-logo"
        style={{
          width: "100%",
          height: "auto",
          maxHeight: 700,
          margin: "0 auto",
          alignItems: "center"
        }}
      />
      <h1
        style={{
          width: "100%",
          margin: "0 auto",
          textAlign: "center",
          color: "#979797",
          fontFamily: "Roboto",
          fontWeight: 600
        }}
      >
        Break the block and <br /> find your inspiration.
      </h1>
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 100,
            marginBottom: 10,
            marginLeft: 10,
            marginRight: 10
          }}
        >
          <button
            style={{
              backgroundColor: "#979797",
              color: "white",
              borderRadius: 10,
              padding: 20,
              fontFamily: "Roboto",
              fontSize: "17px"
            }}
          >
            Home
          </button>
          <button
            style={{
              backgroundColor: "#979797",
              color: "white",
              borderRadius: 10,
              padding: 20,
              fontFamily: "Roboto",
              fontSize: "17px"
            }}
          >
            About
          </button>
          <button
            style={{
              backgroundColor: "#979797",
              color: "white",
              borderRadius: 10,
              padding: 20,
              fontFamily: "Roboto",
              fontSize: "17px"
            }}
          >
            Titans
          </button>
          <button
            style={{
              backgroundColor: "#979797",
              color: "white",
              borderRadius: 10,
              padding: 20,
              fontFamily: "Roboto",
              fontSize: "17px"
            }}
          >
            Data Visualizations
          </button>
          <button
            style={{
              backgroundColor: "#979797",
              color: "white",
              borderRadius: 10,
              padding: 20,
              fontFamily: "Roboto",
              fontSize: "17px"
            }}
          >
            Data Entry
          </button>
        </div>
      </div>
    </div>
  );
};
