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
  const { _id, name, industry, claimToFame, quotes, source } = titan;
  console.log("titan", titan);
  return (
    <div>
      <p>{`_id- ${_id}`}</p>
      <p>{`name- ${name}`}</p>
      <p>{`industry- ${industry}`}</p>
      <p>{`claimToFame- ${claimToFame}`}</p>
      <p>{`source- ${source}`}</p>
      {quotes.map((quote, index) => (
        <div>
          <p>{`quote #${index}- ${quote.message}`}</p>
          <p>{`quote #${index} hashtags- ${JSON.stringify(quote.hashtags)}`}</p>
        </div>
      ))}
    </div>
  );
};