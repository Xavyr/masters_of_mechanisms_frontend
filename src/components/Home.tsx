import * as React from "react";
import { Lightbulbs } from "../images/jsx/Lightbulbs";
import { Route, BrowserRouter, Link } from "react-router-dom";
import { Titans } from "./Titans";
import "../App.css";

export const Home: React.FC = ({}) => {
  console.log(Lightbulbs);
  return (
    <>
      <Link to={`/Titans`}>
        <div style={{ position: "relative", top: -10 }}>
          <Lightbulbs color={"blue"} width={"100%"} height={800} />
        </div>
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
    </>
  );
};
