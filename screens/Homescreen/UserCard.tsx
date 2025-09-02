import * as React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import type { Profile } from "../../types";
import { useAuth } from "../../contexts/AuthContext";

interface UserCardProps {
  user: Profile;
  onLikeToggle?: (userId: string, isLiked: boolean) => void;
}

export const UserCard = ({ user, onLikeToggle }: UserCardProps) => {
  const [isLiked, setIsLiked] = React.useState(false);
  const { session } = useAuth();
  const isLoggedIn = !!session;

  const handleLikePress = () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    onLikeToggle?.(user.id, newLikedState);
  };

  const handleCardPress = () => {
    console.log(`프로필 보기: ${user.first_name}`);
    // 프로필 클릭 수 수집
  };

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        style={styles.userCard}
        activeOpacity={0.9}
        onPress={handleCardPress}
      >
        <Image
          source={
            user.avatar_url.startsWith('http') 
              ? { uri: user.avatar_url } 
              : require("../../assets/profiles/profile1.jpg")
          }
          style={[styles.userImage, !isLoggedIn && styles.blurredImage]}
          resizeMode='cover'
        />
        {!isLoggedIn && (
          <View style={styles.blurOverlay}>
            <Icon name="lock" size={24} color="rgba(255,255,255,0.8)" />
            <Text style={styles.lockText}>로그인하세요</Text>
          </View>
        )}
        <View style={styles.cardOverlay}>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>
              {user.nickname}
            </Text>
            <Text style={styles.userCity}>{user.city}</Text>
          </View>
          {/* NOTE: 필수 기능 x 주석처리 */}
          {/*{user.is_online && <View style={styles.onlineIndicator} />}*/}
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.heartButton}
        onPress={isLiked ? () => {} : handleLikePress} // Prevent action if already liked
        activeOpacity={0.8}
      >
        <View
          style={[
            styles.heartContainer,
            {
              backgroundColor: isLiked
                ? "rgba(238, 156, 167, 0.95)"
                : "rgba(0, 0, 0, 0.3)",
              borderWidth: isLiked ? 0 : 1,
              borderColor: "rgba(255, 255, 255, 0.3)",
            },
          ]}
        >
          <Icon
            name={isLiked ? "favorite" : "favorite-border"}
            size={20}
            color={isLiked ? "white" : "rgba(255, 255, 255, 0.9)"}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    position: "relative",
    marginBottom: 10,
    width: "48%",
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
  userImage: {
    width: "100%",
    height: "100%",
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
  userName: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  userCity: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
  },
  onlineIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#4CAF50",
    borderWidth: 2,
    borderColor: "white",
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
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  blurredImage: {
    opacity: 0.1,
  },
  blurOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  lockText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    fontWeight: "500",
  },
});
