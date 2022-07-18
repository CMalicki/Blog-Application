import React from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from "react-native";
import styles from "./Style";
import RenderHtml from "react-native-render-html";

const width = Dimensions.get("window").width - 20;
const moment = require("moment");

const Post = ({ route }) => {
  const post = route.params?.post;

  if (!post) return null;

  const postContent = post.content.html;
  const source = { html: postContent };

  return (
    <SafeAreaView style={styles.postDetailContainer}>
      <View
        style={{
          marginLeft: 35,
          width: "80%",
          alignSelf: "center",
        }}
      >
        <Text numberOfLines={2} style={styles.postDetailTitle}>
          {post.title}
        </Text>
      </View>
      <Image
        source={{ uri: post.coverImage.url }}
        style={styles.postDetailMainImage}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 5,
        }}
      >
        <Text style={{ fontSize: 13, color: "grey", textAlign: "left" }}>
          {post.author.name}
        </Text>
        <Text style={{ fontSize: 13, color: "grey" }}>
          {moment(post.createdAt).format("MMMM DD, YYYY")}
        </Text>
      </View>
      <ScrollView style={{ padding: 5, marginTop: 5 }}>
        <RenderHtml source={source} contentWidth={width}></RenderHtml>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Post;
