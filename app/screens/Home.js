import { ApolloProvider, useQuery } from "@apollo/client";
import { View } from "react-native";
import { PostsList } from "../api/PostsList";
import client from "../api/ApolloClient";

const Home = () => {
  return (
    <ApolloProvider client={client}>
      <View>
        <PostsList></PostsList>
      </View>
    </ApolloProvider>
  );
};

export default Home;
