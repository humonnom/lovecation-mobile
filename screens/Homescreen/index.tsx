import * as React from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
import { Header } from "../../components/Header";
import { UserGrid } from "./UserGrid";
import { useProfiles } from "../../hooks/queries";
import { useAuth } from "../../contexts/AuthContext";

export const HomeScreen = () => {
  const { session, user } = useAuth();
  const isLoggedIn = !!session;
  
  // 로그인한 경우: 반대 성별, 비로그인: 모든 성별
  const getGenderFilter = () => {
    if (!isLoggedIn || !user?.user_metadata?.gender) {
      return null; // 모든 성별
    }
    // 반대 성별 반환
    return user.user_metadata.gender === 'male' ? 'female' : 'male';
  };
  
  const { profiles, loading, error } = useProfiles({ gender: getGenderFilter() });

  if (loading) {
    return (
      <View style={styles.container}>
        <Header
          title='새로운 인연 찾기'
          subtitle='하트를 눌러 관심을 표현해보세요.'
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#EE9CA7" />
          <Text style={styles.loadingText}>프로필을 불러오는 중...</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Header
          title='새로운 인연 찾기'
          subtitle='하트를 눌러 관심을 표현해보세요.'
        />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>프로필을 불러올 수 없습니다</Text>
          <Text style={styles.errorMessage}>{error}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header
        title='새로운 인연 찾기'
        subtitle='하트를 눌러 관심을 표현해보세요.'
      />
      <UserGrid users={profiles} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFDFD"
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500"
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 8
  },
  errorText: {
    fontSize: 18,
    color: "#333",
    fontWeight: "600",
    textAlign: "center"
  },
  errorMessage: {
    fontSize: 14,
    color: "#666",
    textAlign: "center"
  }
});
