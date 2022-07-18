import React from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import Colors from "../constants/Colors";

const imageWidth = 120;

const PostListItem = ({ post, onClick }) => {
  const moment = require("moment");

  const getThumbnail = (imageUri) => {
    if (imageUri) return { uri: imageUri };

    return require("../../assets/notFound.jpg");
  };

  return (
    <TouchableOpacity
      onPress={onClick}
      style={{ flexDirection: "row", marginTop: 7 }}
    >
      <Image
        source={getThumbnail(post.coverImage.url)}
        style={{ width: imageWidth, height: imageWidth / 1.8 }}
      />
      <View style={{ flex: 1, marginLeft: 5 }}>
        <Text
          style={{ fontSize: 15, fontWeight: "500", color: Colors.dark.tint }}
        >
          {post.title}
        </Text>
        <Text style={{ fontSize: 13, color: "grey" }}>
          {post.author.name} -{moment(post.createdAt).format("MMMM DD, YYYY")}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PostListItem;
