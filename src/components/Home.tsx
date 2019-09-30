import * as React from "react";
import lightbulbs from "../images/lightbulbs.svg";
import { Route, BrowserRouter, Link } from "react-router-dom";
import { Titans } from "./Titans";
import "../App.css";

export const Home: React.FC = ({}) => {
  return (
    <div
      style={{
        alignItems: "center"
      }}
    >
      <Link to={`/Titans`}>
        <img
          src={lightbulbs}
          alt="lightbulbs-logo"
          style={{
            width: "100%",
            height: 700,
            // maxHeight: 700,
            margin: "0 auto",
            alignItems: "center"
          }}
        />
      </Link>
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
      <div></div>
    </div>
  );
};
