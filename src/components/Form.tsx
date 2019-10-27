import * as React from "react";
import { useState } from "react";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";

import { TextField, Button, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  cleanQuotes,
  cleanPractices,
  cleanParadigms,
  cleanRoutines,
  cleanInspirationals
} from "../utils/formDataUtils";

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  button: {
    margin: theme.spacing(1)
  }
}));

type InputProps = {
  fieldName: string;
  onChange: (eventValue: string) => void;
  multi?: boolean;
};

const ExtraSpace = () => (
  <>
    <br />
    <br />
    <br />
  </>
);

const SingleEntryInput: React.FC<InputProps> = ({
  fieldName,
  onChange,
  multi
}) => {
  const classes = useStyles("");
  return (
    <TextField
      multiline={multi}
      rows={8}
      id="outlined-name"
      label={fieldName}
      className={classes.textField}
      onChange={event => onChange(event.target.value)}
      margin="normal"
      variant="outlined"
    />
  );
};

const MultiEntryInput: React.FC<any> = ({
  hookLabel,
  hookDataStructure,
  onClickCallback,
  generateInputCallback
}) => {
  const classes = useStyles("");
  return (
    <>
      <ExtraSpace />
      <div>
        <Button
          variant="contained"
          color="default"
          className={classes.button}
          onClick={() => onClickCallback(hookLabel, hookDataStructure)}
        >
          {`Add ${hookLabel} (+)`}
        </Button>
      </div>

      {generateInputCallback(hookLabel)}
    </>
  );
};

const SAVE_TITAN = gql`
  mutation saveTitan(
    $name: String
    $industry: String
    $claimToFame: String
    $source: String
    $quotes: [QuoteInput]
    $practices: [PracticeInput]
    $paradigms: [ParadigmInput]
    $inspirationals: [InspirationalInput]
    $routines: [RoutineInput]
  ) {
    saveTitan(
      name: $name
      industry: $industry
      claimToFame: $claimToFame
      source: $source
      quotes: $quotes
      practices: $practices
      paradigms: $paradigms
      inspirationals: $inspirationals
      routines: $routines
    ) {
      _id
      name
      industry
      claimToFame
      quotes {
        _id
        titan
        message
        hashtags
      }
      practices {
        _id
        titan
        practice
        frequency
        description
      }
      paradigms {
        _id
        titan
        paradigm
        background
      }
      routines {
        _id
        what
        where
        when
        benefits
      }
      inspirationals {
        _id
        titan
        story
        source
      }
      source
    }
  }
`;

export const Form: React.FC = props => {
  const [name, setName] = useState();
  const [industry, setIndustry] = useState();
  const [claimToFame, setClaimToFame] = useState();
  const [source, setSource] = useState();
  const [bio, setBio] = useState();
  const [quotes, setQuotes] = useState([]);
  const [practices, setPractices] = useState([]);
  const [paradigms, setParadigms] = useState([]);
  const [routines, setRoutines] = useState([]);
  const [inspirationals, setinspirationals] = useState([]);

  const classes = useStyles("");

  const [saveTitan, { data, error, loading }] = useMutation(SAVE_TITAN);

  const hookControlBoard = hook => {
    switch (hook) {
      case "quotes":
        return { hookGetter: quotes, hookSetter: setQuotes };
      case "practices":
        return { hookGetter: practices, hookSetter: setPractices };
      case "paradigms":
        return { hookGetter: paradigms, hookSetter: setParadigms };
      case "routines":
        return { hookGetter: routines, hookSetter: setRoutines };
      case "inspirationals":
        return {
          hookGetter: inspirationals,
          hookSetter: setinspirationals
        };

      default:
      // code block
    }
  };

  const updateUserTyping = (hook, entity, value, index, setter) => {
    const currData = [...hook];
    currData[index][entity] = value;
    setter(currData);
  };

  const pushEntityDivToHook = (entity: string, structure) => {
    const currentData = [...hookControlBoard(entity).hookGetter];
    const hookSetter = hookControlBoard(entity).hookSetter;
    currentData.push(structure);
    typeof hookSetter === "function" && hookSetter(currentData);
  };

  const generateMultiEntityInputs = label => {
    const multilineEntities = {
      story: true,
      benefits: true,
      background: true,
      description: true
    };
    const hook = hookControlBoard(label);
    const getter = hook.hookGetter;
    const setter = hook.hookSetter;
    return (
      typeof hook === "object" &&
      getter.map((quote, i) => {
        const entities = Object.keys(quote);
        return (
          <div>
            {entities.map(
              entity =>
                entity !== "titan" && (
                  <TextField
                    id="outlined-name"
                    label={entity}
                    name={`${entity}${i}`}
                    className={classes.textField}
                    onChange={event =>
                      updateUserTyping(
                        getter,
                        entity,
                        event.target.value,
                        i,
                        setter
                      )
                    }
                    margin="normal"
                    variant="outlined"
                    multiline={multilineEntities[entity]}
                    rows={8}
                  />
                )
            )}
          </div>
        );
      })
    );
  };

  const submitFormValues = () => {
    if (!name) return null;

    console.log("check Data being saved", {
      name,
      industry,
      claimToFame,
      source,
      bio,
      quotes: cleanQuotes(quotes, name),
      practices: cleanPractices(practices, name),
      paradigms: cleanParadigms(paradigms, name),
      routines: cleanRoutines(routines, name),
      inspirationals: cleanInspirationals(inspirationals, name)
    });

    saveTitan({
      variables: {
        name,
        industry,
        claimToFame,
        source,
        bio,
        quotes: cleanQuotes(quotes, name),
        practices: cleanPractices(practices, name),
        paradigms: cleanParadigms(paradigms, name),
        routines: cleanRoutines(routines, name),
        inspirationals: cleanInspirationals(inspirationals, name)
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
          <div>
            <SingleEntryInput
              fieldName={"Bio"}
              onChange={value => setBio(value)}
              multi={true}
            />
          </div>
        </div>
        <MultiEntryInput
          hookLabel={"quotes"}
          hookDataStructure={{ message: "", hashtags: "" }}
          onClickCallback={pushEntityDivToHook}
          generateInputCallback={generateMultiEntityInputs}
        />
        <MultiEntryInput
          hookLabel={"practices"}
          hookDataStructure={{
            practice: "",
            description: "",
            frequency: ""
          }}
          onClickCallback={pushEntityDivToHook}
          generateInputCallback={generateMultiEntityInputs}
        />
        <MultiEntryInput
          hookLabel={"paradigms"}
          hookDataStructure={{
            paradigm: "",
            background: ""
          }}
          onClickCallback={pushEntityDivToHook}
          generateInputCallback={generateMultiEntityInputs}
        />
        <MultiEntryInput
          hookLabel={"routines"}
          hookDataStructure={{
            routine: "",
            where: "",
            when: "",
            benefits: ""
          }}
          onClickCallback={pushEntityDivToHook}
          generateInputCallback={generateMultiEntityInputs}
        />
        <MultiEntryInput
          hookLabel={"inspirationals"}
          hookDataStructure={{
            source: "",
            story: ""
          }}
          onClickCallback={pushEntityDivToHook}
          generateInputCallback={generateMultiEntityInputs}
        />
        <ExtraSpace />
        <Button
          style={{ width: "50%", margin: "0 auto" }}
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => submitFormValues()}
        >
          Submit Form
        </Button>
        <ExtraSpace />
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
