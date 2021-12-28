import { ApolloProvider } from "@apollo/client";
import cliente from "../config/apollo";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={cliente}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
