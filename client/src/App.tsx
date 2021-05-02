import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
// import { ApolloProvider } from "@apollo/react-hooks";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import { ApolloLink } from "apollo-link";
import { onError } from "apollo-link-error";
import "date-fns";
import React from "react";
import { useRoutes } from "react-router-dom";
import GlobalContextProvider from "./context/GlobalContext";
import { useUserContext } from "./context/UserContext";
import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";
import routes from "./routes";
import { apiUrl } from "./utils/Branch";

const httpLink = new HttpLink({
  // uri: "http://devserver.tanosugi.com:80/graphql/",
  // uri: "http://pandatch-api.develop.tanosugi.com:80/graphql/",
  uri: apiUrl(),
  fetchOptions: { mode: "cors" },
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : "",
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});
const errorAndHttplink = ApolloLink.from([
  errorLink,
  authLink,
  httpLink as any,
]);

const client = new ApolloClient({
  // link: authLink.concat(httpLink),
  link: errorAndHttplink as any,
  cache: new InMemoryCache(),
});

const App = () => {
  // const routing = useRoutes(routes);
  console.log(apiUrl());
  const { isLoggedIn } = useUserContext();
  const routing = useRoutes(routes(isLoggedIn));

  return (
    <ErrorBoundary>
      <ApolloProvider client={client}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <GlobalContextProvider>{routing}</GlobalContextProvider>
        </LocalizationProvider>
      </ApolloProvider>
    </ErrorBoundary>
  );
};

export default App;
