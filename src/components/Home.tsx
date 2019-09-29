import * as React from "react";
import tony from "../tony.jpg";

export const Home: React.FC = ({}) => {
  return (
    <img src={tony} alt="Smiley face" style={{ width: 800, height: 500 }} />
  );
};
