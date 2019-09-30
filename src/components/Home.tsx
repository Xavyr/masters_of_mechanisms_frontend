import * as React from "react";
import lightbulbs from "../images/lightbulbs.svg";
import "../App.css";

export const Home: React.FC = ({}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
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
      <div
        style={{
          position: "fixed",
          left: 0,
          bottom: 0,
          width: "100%",
          textAlign: "center"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 100,
            marginBottom: 10
          }}
        >
          <button
            style={{
              backgroundColor: "#979797",
              color: "white",
              borderRadius: 10,
              padding: 20
            }}
          >
            Home
          </button>
          <button
            style={{
              backgroundColor: "#979797",
              color: "white",
              borderRadius: 10,
              padding: 20
            }}
          >
            About
          </button>
          <button
            style={{
              backgroundColor: "#979797",
              color: "white",
              borderRadius: 10,
              padding: 20
            }}
          >
            Titans
          </button>
          <button
            style={{
              backgroundColor: "#979797",
              color: "white",
              borderRadius: 10,
              padding: 20
            }}
          >
            Data Visualizations
          </button>
          <button
            style={{
              backgroundColor: "#979797",
              color: "white",
              borderRadius: 10,
              padding: 20
            }}
          >
            Data Entry
          </button>
        </div>
      </div>
    </div>
  );
};
