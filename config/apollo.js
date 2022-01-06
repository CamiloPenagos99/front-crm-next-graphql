import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import fetch from "node-fetch";
import { setContext } from "apollo-link-context";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
  fetch,
});

/**
 * Configurar los headers, para enviar la autenticacion y jwt
 */
const authLink = setContext((_, { headers }) => {
  //leer token

  const token = localStorage.getItem("tkn");
  return {
    headers: {
      ...headers,
      authorization: token,
    },
  };
});

const cliente = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

export default cliente;
