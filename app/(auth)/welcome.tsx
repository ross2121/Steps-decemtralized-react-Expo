import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Animated,
} from "react-native";
import { useFonts } from "expo-font";
import { Redirect, router } from "expo-router"; // Import router

const { width, height } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    title: "Stake to Achieve",
    description:
      "Join challenges by staking SOL. Put your money where your goals are and commit to real change.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sleep2-fG2vcfD3gree3esrHD30VsJRIARcBn.png",
  },
  {
    id: "2",
    title: "Track Your Progress",
    description:
      "Automated tracking connects with health APIs to monitor your activity. Watch your goals become reality in real-time.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Run2-fFH8dYzEJFImG0dLzWwRjSPHXX8FYj.gif",
  },
  {
    id: "3",
    title: "Earn Rewards",
    description:
      "Complete challenges to get your stake back plus rewards. Success pays off—literally.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sleep2-fG2vcfD3gree3esrHD30VsJRIARcBn.png",
  },
  {
    id: "4",
    title: "Compete & Connect",
    description:
      "Join a community of achievers. Climb leaderboards, earn badges, and celebrate streaks together.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Run2-fFH8dYzEJFImG0dLzWwRjSPHXX8FYj.gif",
  },
];

const Slide = ({ item }) => {
  return (
    <View style={styles.slideContainer}>
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );
};

const Paginator = ({ data, scrollX }) => {
  return (
    <View style={styles.paginationContainer}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: "clamp",
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            style={[
              styles.dot,
              {
                width: dotWidth,
                opacity,
              },
            ]}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
};

const Welcome = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      // Navigate to the signup page
      router.push();
    }
  };

  return (
    <LinearGradient
      colors={["#1a0033", "#4b0082", "#290d44"]}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <View style={styles.slidesContainer}>
          <FlatList
            data={slides}
            renderItem={({ item }) => <Slide item={item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            bounces={false}
            keyExtractor={(item) => item.id}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={32}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={viewConfig}
            ref={slidesRef}
          />
        </View>

        <Paginator data={slides} scrollX={scrollX} />

        <TouchableOpacity style={styles.button} onPress={scrollTo}>
          <Text style={styles.buttonText}>
            {currentIndex === slides.length - 1 ? "Get Started" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  slidesContainer: {
    flex: 3,
  },
  slideContainer: {
    width,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: {
    width: width * 0.8,
    height: height * 0.4,
    marginBottom: 20,
  },
  title: {
    fontWeight: "800",
    fontSize: 28,
    marginBottom: 10,
    color: "#ffffff",
    textAlign: "center",
  },
  description: {
    fontWeight: "300",
    color: "#e0e0e0",
    textAlign: "center",
    paddingHorizontal: 20,
    fontSize: 16,
    lineHeight: 24,
  },
  paginationContainer: {
    flexDirection: "row",
    height: 64,
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ffffff",
    marginHorizontal: 8,
  },
  button: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 15,
    borderRadius: 30,
    marginBottom: 40,
    width: width * 0.6,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default Welcome;
