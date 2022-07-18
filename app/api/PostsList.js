import React from "react";
import { FlatList, Text, View } from "react-native";
import { useQuery, gql } from "@apollo/client";
import PostListItem from "../components/PostListItem";
import PostSlider from "../components/PostSlider";
import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";

const QUERY = gql`
  {
    posts {
      id
      title
      createdAt
      author {
        name
      }
      content {
        html
      }
      coverImage {
        url
      }
    }
  }
`;

export function PostsList({ navigation }) {
  const { data, loading, error } = useQuery(QUERY);
  navigation = useNavigation();

  if (loading || error) {
    return null;
  }

  const handlePostPress = (post) => {
    navigation.navigate("Post", { post });
  };

  const renderPost = ({ item: post }) => {
    return (
      <View style={{ marginTop: 5 }}>
        <PostListItem onClick={() => handlePostPress(post)} post={post} />
      </View>
    );
  };

  var allData = [];

  // Sort data by creation time
  for (let i = 0; i < data.posts.length; i++) {
    allData.push(data.posts[i]);
  }
  allData.sort(function (a, b) {
    return a.createdAt < b.createdAt;
  });

  // Show only 4 recent Posts (already sorted)
  var recentPosts = [];
  for (let i = 0; i < 4; i++) {
    recentPosts.push(allData[i]);
  }

  return (
    <View style={{ height: "100%" }}>
      <PostSlider data={recentPosts} title="Recent posts"></PostSlider>
      <View style={{ marginTop: 25 }}>
        <Text
          style={{
            paddingHorizontal: 10,
            fontWeight: "600",
            fontSize: 20,
            color: Colors.light.tint,
          }}
        >
          All posts
        </Text>
      </View>
      <FlatList
        style={{ paddingHorizontal: 10 }}
        data={allData}
        renderItem={renderPost}
      />
    </View>
  );
}
