import * as React from "react";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const GET_TITANS = gql`
  query getAllTitans {
    getTitans {
      _id
      name
      industry
      claimToFame
      bio
      quotes {
        _id
        titan
        message
        hashtags
      }
      paradigms {
        _id
        titan
        background
        paradigm
      }
      practices {
        _id
        titan
        practice
        frequency
        description
      }
      routines {
        _id
        what
        when
        where
        benefits
      }
      inspirationals {
        story
        source
      }
      source
    }
  }
`;

export const Titans: React.FC = props => {
  return (
    <Query query={GET_TITANS}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        const { getTitans } = data;
        console.log(loading, error, data);
        return (
          <div>
            <div>All the Titans Page</div>
            <ul>
              {getTitans.map(titan => (
                <li key={titan.name}>
                  <Link
                    to={{
                      pathname: `/titans/${titan.name}`,
                      state: { titan: titan }
                    }}
                  >
                    {titan.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      }}
    </Query>
  );
};
