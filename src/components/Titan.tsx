import * as React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

type Props = any;

// type Titan = {
//   _id: string;
//   name: string;
//   industry: string;
//   claimToFame: string;
//   quotes: [Quote];
//   source: string;
// };

// type Quote = {
//   message: string;
//   hashtags: {};
// };

export const Titan: React.FC = (props: Props) => {
  const { titan } = props.location.state;
  const {
    _id,
    name,
    industry,
    claimToFame,
    quotes,
    source,
    bio,
    paradigms,
    practices,
    routines,
    inspirationals
  } = titan;
  console.log("titan", titan);
  console.log("SOUR", source);
  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <p>{`_id- ${_id}`}</p>
        <p>{`name- ${name}`}</p>
        <p>{`industry- ${industry}`}</p>
        <p>{`claimToFame- ${claimToFame}`}</p>
        <p>{`bio- ${bio}`}</p>
        <p>{`source- ${source}`}</p>
      </div>

      {quotes &&
        quotes.map((quote, index) => (
          <div>
            <p>{`quote #${index}- ${quote.message}`}</p>
            <p>{`quote #${index} hashtags- ${JSON.stringify(
              quote.hashtags
            )}`}</p>
          </div>
        ))}
      {practices &&
        practices.map(({ practice, description, frequency }, index) => (
          <div>
            <p>{`practice #${index}- ${practice}`}</p>
            <p>{`description #${index}- ${description}`}</p>
            <p>{`frequency #${index}- ${frequency}`}</p>
          </div>
        ))}
      {paradigms &&
        paradigms.map(({ paradigm, background }, index) => (
          <div>
            <p>{`paradigm #${index}- ${paradigm}`}</p>
            <p>{`background #${index}- ${background}`}</p>
          </div>
        ))}
      {routines &&
        routines.map(({ routine, what, where, when, benefits }, index) => (
          <div>
            <p>{`routines #${index}- ${routine}`}</p>
            <p>{`what #${index}- ${what}`}</p>
            <p>{`where #${index}- ${where}`}</p>
            <p>{`when #${index}- ${when}`}</p>
            <p>{`benefits #${index}- ${benefits}`}</p>
          </div>
        ))}
      {inspirationals &&
        inspirationals.map(({ story, source }, index) => (
          <div>
            <p>{`story #${index}- ${story}`}</p>
            <p>{`source #${index}- ${source}`}</p>
          </div>
        ))}
    </div>
  );
};
