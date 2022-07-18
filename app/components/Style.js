import { StyleSheet, Dimensions, Platform } from "react-native";
import Colors from "../constants/Colors";

const width = Dimensions.get("window").width - 20;

const styles = StyleSheet.create({
  sliderContainer: {
    alignSelf: "center",
    width: width,
    paddingTop: Platform.OS === "android" ? 30 : 0,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: Colors.light.tint,
  },
  postDetailTitle: {
    fontWeight: "bold",
    fontSize: 20,
    color: Colors.light.tint,
    textAlign: "center",
    paddingVertical: 16,
  },
  postDetailContainer: {
    paddingTop: Platform.OS === "android" ? 30 : 0,
    alignSelf: "center",
    width: "100%",
    flex: 1,
  },
  sliderImage: {
    width: width,
    height: width / 1.8,
    borderRadius: 8,
    resizeMode: "stretch",
  },
  postDetailMainImage: {
    width: "100%",
    height: width / 1.8,
    resizeMode: "stretch",
  },
});

export default styles;
