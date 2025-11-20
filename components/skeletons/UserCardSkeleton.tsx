import React from "react";
import {StyleSheet, View} from "react-native";
import ImageSkeleton from "./ImageSkeleton";

interface UserCardSkeletonProps {}

const UserCardSkeleton: React.FC<UserCardSkeletonProps> = ({}) => {
  return (
    <View style={[styles.cardContainer, { width: "48%" }]}>
      <View style={styles.userCard}>
        <ImageSkeleton width="100%" height={250} borderRadius={20} />

        {/* Heart button skeleton */}
        <View style={styles.heartButton}>
          <View style={styles.heartContainer} />
        </View>

        {/* Bottom overlay skeleton */}
        <View style={styles.cardOverlay}>
          <View style={styles.userInfo}>
            {/* Name skeleton */}
            <View style={styles.nameSkeleton} />
            {/* City skeleton */}
            <View style={styles.citySkeleton} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    position: "relative",
    marginBottom: 10,
  },
  userCard: {
    borderRadius: 20,
    overflow: "hidden",
    position: "relative",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    height: 250,
  },
  heartButton: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 10,
  },
  heartContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(232, 232, 232, 0.7)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  cardOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  userInfo: {
    flex: 1,
  },
  nameSkeleton: {
    width: "60%",
    height: 16,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    borderRadius: 4,
    marginBottom: 6,
  },
  citySkeleton: {
    width: "40%",
    height: 12,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: 4,
  },
});

export default UserCardSkeleton;
