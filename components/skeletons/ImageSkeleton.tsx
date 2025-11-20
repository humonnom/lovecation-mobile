import React, {useEffect, useRef} from "react";
import {Animated, DimensionValue, StyleSheet, View, ViewStyle} from "react-native";

interface ImageSkeletonProps {
  width?: DimensionValue;
  height?: DimensionValue;
  borderRadius?: number;
  style?: ViewStyle;
}

const ImageSkeleton: React.FC<ImageSkeletonProps> = ({
  width = "100%",
  height = 200,
  borderRadius = 12,
  style,
}) => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const shimmerAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    );

    shimmerAnimation.start();

    return () => shimmerAnimation.stop();
  }, [shimmerAnim]);

  const opacity = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <View style={[styles.container, { width, height, borderRadius }, style]}>
      <Animated.View style={[styles.shimmer, { opacity, borderRadius }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E8E8E8",
    overflow: "hidden",
  },
  shimmer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F5F5F5",
  },
});

export default ImageSkeleton;