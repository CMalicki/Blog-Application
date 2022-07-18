import { useState, useEffect, useRef } from "react";
import Colors from "../constants/Colors";
import {
  Text,
  View,
  FlatList,
  Dimensions,
  Image,
  SafeAreaView,
} from "react-native";
import styles from "./Style";

const width = Dimensions.get("window").width - 20;
let currentSlideIndex = 0;

export default function PostSlider({ data, title }) {
  const [renderData, setRenderData] = useState([]);
  const [visibleSlideIndex, setVisibleSlideIndex] = useState(0);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    currentSlideIndex = viewableItems[0]?.index || 0;
    setVisibleSlideIndex(currentSlideIndex);
  });

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const flatList = useRef();

  useEffect(() => {
    const newData = [[...data].pop(), ...data, [...data].shift()];
    setRenderData([...newData]);
  }, [data.length]);

  useEffect(() => {
    if (visibleSlideIndex === renderData.length - 1 && renderData.length) {
      flatList.current.scrollToIndex({ animated: false, index: 1 });
    }

    if (visibleSlideIndex === 0 && renderData.length) {
      flatList.current.scrollToIndex({
        animated: false,
        index: renderData.length - 2,
      });
    }

    const lastSlide = currentSlideIndex === renderData.length - 1;
    const firstSlide = currentSlideIndex === 0;

    if (lastSlide && renderData.length) {
      setActiveSlideIndex(0);
    } else if (firstSlide && renderData.length) {
      setActiveSlideIndex(renderData.length - 2);
    } else {
      setActiveSlideIndex(currentSlideIndex - 1);
    }
  }, [visibleSlideIndex]);

  const renderItem = ({ item }) => {
    return (
      <View>
        <Image
          source={{ uri: item.coverImage.url }}
          style={styles.sliderImage}
        />
        <View style={{ width }}>
          <Text numberOfLines={2} style={styles.title}>
            {item.title}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.sliderContainer}>
      <View
        style={{
          flexDirection: "row",
          alingItems: "center",
          justifyContent: "space-between",
          paddingVertical: 7,
        }}
      >
        <Text style={styles.title}>{title}</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <SlideIndicators data={data} activeSlideIndex={activeSlideIndex} />
        </View>
      </View>
      <FlatList
        ref={flatList}
        data={renderData}
        keyExtractor={(item, index) => item.id + index}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={1}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig.current}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

const SlideIndicators = ({ data, activeSlideIndex }) =>
  data.map((item, index) => {
    return (
      <View
        key={item.id}
        style={{
          width: 10,
          height: 10,
          borderRadius: 2,
          borderWidth: 1,
          marginLeft: 6,
          backgroundColor:
            activeSlideIndex === index ? Colors.light.tint : "transparent",
        }}
      />
    );
  });
