import * as React from "react";
import { useState } from "react";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";

const SAVE_TITAN = gql`
  mutation saveTitan(
    $name: String
    $industry: String
    $claimToFame: String
    $source: String
    $quotes: [QuoteInput]
  ) {
    saveTitan(
      name: $name
      industry: $industry
      claimToFame: $claimToFame
      source: $source
      quotes: $quotes
    ) {
      name
      industry
      claimToFame
      source
      quotes {
        message
        hashtags
        titan
      }
    }
  }
`;

export const Form: React.FC = props => {
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");
  const [claimToFame, setClaimToFame] = useState("");
  const [source, setSource] = useState("");
  const [quotes, setQuotes] = useState([]);

  //Apollo Hook Mutations
  const [saveTitan, { data, loading }] = useMutation(SAVE_TITAN);
  console.log(loading);
  const stateMachine = {
    name: (value: string) => {
      setName(value);
    },
    industry: (value: string) => {
      setIndustry(value);
    },
    claimToFame: (value: string) => {
      setClaimToFame(value);
    },
    source: (value: string) => {
      setSource(value);
    },
    quote: (message: string, index: number) => {
      const currQuotes = Array.from(quotes);
      currQuotes[index].message = message;
      setQuotes(currQuotes);
    },
    hashtag: (hashtags: string, index: number) => {
      const currQuotes = Array.from(quotes);
      currQuotes[index].hashtags = hashtags;
      setQuotes(currQuotes);
    }
  };

  const addQuoteDiv = () => {
    const emptyQuote = {
      message: "",
      hashtags: ""
    };
    const currentQuotes = Array.from(quotes);
    currentQuotes.push(emptyQuote);
    setQuotes(currentQuotes);
  };

  const generateQuoteDivs = () => {
    return quotes.map((quote, i) => (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <input
          onChange={event => stateMachine.quote(event.target.value, i)}
          type="text"
          name={`quote${i}`}
        />
        <p>Hashtags</p>
        <input
          onChange={event => stateMachine.hashtag(event.target.value, i)}
          type="text"
          name={`hashtags${i}`}
        />
      </div>
    ));
  };

  const submitFormValues = () => {
    const cleanQuotes = quotes.map(quote => {
      quote["titan"] = name;
      return quote;
    });
    saveTitan({
      variables: {
        name,
        industry,
        claimToFame,
        source,
        quotes: cleanQuotes
      }
    });
  };

  return (
    <div>
      <p>Name</p>
      <input
        onChange={event => stateMachine.name(event.target.value)}
        type="text"
        name="name"
      />
      <p>Industry</p>
      <input
        onChange={event => stateMachine.industry(event.target.value)}
        type="text"
        name="industry"
      />
      <p>Claim To Fame</p>
      <input
        onChange={event => stateMachine.claimToFame(event.target.value)}
        type="text"
        name="claimToFame"
      />
      <p>Source</p>
      <input
        onChange={event => stateMachine.source(event.target.value)}
        type="text"
        name="source"
      />
      <p>Quote</p>
      <button onClick={() => addQuoteDiv()}>Add Anoter Quote</button>
      {generateQuoteDivs()}
      <button onClick={() => submitFormValues()}>Submit This Form</button>
      <br />
      <br />
      <br />
      {loading && !data ? <div>Cranking...</div> : null}
      {data && data.saveTitan ? (
        <div>
          <h3>Successful Save</h3>
          <Link
            to={{
              pathname: `/titans/${data.saveTitan.name}`,
              state: { titan: data.saveTitan }
            }}
          >
            {`Check out the bio of ${data.saveTitan.name}`}
          </Link>
          <p>{JSON.stringify(data.saveTitan)}</p>
        </div>
      ) : null}
    </div>
  );
};
