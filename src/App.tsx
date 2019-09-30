import React, { useState, createContext } from "react";
import * as ReactDOM from "react-dom";
import { Route, BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "@apollo/react-hooks";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import "isomorphic-fetch";

//import { WindowDimensionsProvider } from "./layout/WindowDimensionsProvider";
//import { Breakpoints } from "./layout/breakpoints";
import { Navbar } from "./components/Navbar";
import { Home } from "./components/Home";
import { About } from "./components/About";
import { Titans } from "./components/Titans";
import { Titan } from "./components/Titan";
import { Form } from "./components/Form";
import { DataVisualizations } from "./components/DataVisualizations";

const cache = new InMemoryCache();
const link = new HttpLink({
  //Deployed URL
  uri: "https://savvy-mantis-253123.appspot.com/",
  //Local url
  //uri: "http://localhost:8000/",
  fetch
});

const client = new ApolloClient({
  cache: cache,
  link: link,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network"
    }
  }
});

const App = () => {
  //const { width, height } = useWindowDimensions();
  //console.log("width", width, "height", height);

  return (
    <div>
      <BrowserRouter>
        <ApolloProvider client={client}>
          <ApolloHooksProvider client={client}>
            {/* <Navbar /> */}
            <Route path="/home" component={Home} />
            <Route path="/about" component={About} />
            <Route exact path="/titans" component={Titans} />
            <Route path="/titans/:name" component={Titan} />
            <Route path="/visualizations" component={DataVisualizations} />
            <Route path="/form" component={Form} />
          </ApolloHooksProvider>
        </ApolloProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;

// ReactDOM.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>,
//   document.getElementById("app")
// );
