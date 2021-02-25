import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import fetch from "node-fetch";
import { setContext } from "apollo-link-context";

// Instance of createHttpLink
// This is the config to where we will be connecting to obtain the data
const httpLink = createHttpLink({
  uri: "http://localhost:4000/",
  fetch,
});

// Add our token and pass it via headers
// The setContext will allow us to modify the headers.
// The second value in setContext are the headers to modify.
const authLink = setContext((_, { headers }) => {
  // Here we can read the saved storage.
  const token = localStorage.getItem("token");

  return {
    // This returns the headers.
    // First, it returns the headers as is.
    // Then adds the new header.
    headers: {
      ...headers,
      authorization: token ? `${token}` : "",
    },
  };
});

const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  // Creates new header and connect it to Apollo client.
  link: authLink.concat( httpLink ),
});

export default client;
