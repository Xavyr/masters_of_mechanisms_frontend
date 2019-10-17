import * as React from "react";
import { useState } from "react";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";

import { TextField, Button, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

type InputProps = {
  fieldName: string;
  onChange: (eventValue: string) => void;
};

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  button: {
    margin: theme.spacing(1)
  }
}));

const SingleEntryInput: React.FC<InputProps> = ({ fieldName, onChange }) => {
  const classes = useStyles("");
  return (
    <TextField
      id="outlined-name"
      label={fieldName}
      className={classes.textField}
      onChange={event => onChange(event.target.value)}
      margin="normal"
      variant="outlined"
    />
  );
};

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

  const classes = useStyles("");

  //Apollo Hook Mutations
  const [saveTitan, { data, loading }] = useMutation(SAVE_TITAN);

  const stateMachine = {
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
      <div>
        <TextField
          id="outlined-name"
          label={"Quote"}
          name={`quote${i}`}
          className={classes.textField}
          onChange={event => stateMachine.quote(event.target.value, i)}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-name"
          label={"Hashtags"}
          name={`hashtags${i}`}
          className={classes.textField}
          onChange={event => stateMachine.hashtag(event.target.value, i)}
          margin="normal"
          variant="outlined"
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
    <>
      <Paper
        elevation={3}
        style={{
          width: "80%",
          margin: "0 auto",
          textAlign: "center",
          marginTop: 50,
          padding: 20
        }}
      >
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
          Data Entry
        </h1>
        <h3
          style={{
            width: "100%",
            margin: "0 auto",
            textAlign: "center",
            color: "#979797",
            fontFamily: "Roboto",
            fontWeight: 600
          }}
        >
          Please input data regarding a particular titan of industry
        </h3>
        <div>
          <SingleEntryInput
            fieldName={"Name"}
            onChange={value => setName(value)}
          />
        </div>
        <div>
          <SingleEntryInput
            fieldName={"Industry"}
            onChange={value => setIndustry(value)}
          />
          <SingleEntryInput
            fieldName={"Claim To Fame"}
            onChange={value => setClaimToFame(value)}
          />
          <SingleEntryInput
            fieldName={"Source"}
            onChange={value => setSource(value)}
          />
        </div>
        <div>
          <Button
            variant="contained"
            color="default"
            className={classes.button}
            onClick={() => addQuoteDiv()}
          >
            Add Quotes (+)
          </Button>
        </div>
        {generateQuoteDivs()}
        <br />
        <br />
        <br />
        <Button
          style={{ width: "50%", margin: "0 auto" }}
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => submitFormValues()}
        >
          Submit Form
        </Button>
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
      </Paper>
    </>
  );
};
