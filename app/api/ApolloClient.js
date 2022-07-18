import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api-eu-central-1.graphcms.com/v2/cl55cp4r03g6701t8bouq4vzp/master",
  cache: new InMemoryCache(),
});

export default client;
