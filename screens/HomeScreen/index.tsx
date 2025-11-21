import * as React from "react";
import {Button, ScrollView, StyleSheet, Text, View} from "react-native";
import {useTranslation} from "react-i18next";
import {Header} from "../../components/Header";
import {useProfiles} from "../../hooks/queries";
import {useAuth} from "../../contexts/AuthContext";
import {UserCardSkeleton} from "../../components/skeletons";

export const HomeScreen = () => {
  const { t } = useTranslation();
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
          title={t('home.title')}
          subtitle={t('home.subtitle')}
        />
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.userGrid}>
            {Array.from({ length: 6 }).map((_, index) => (
              <UserCardSkeleton key={index} />
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Header
          title={t('home.title')}
          subtitle={t('home.subtitle')}
        />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{t('home.errorLoadingProfiles')}</Text>
          <Text style={styles.errorMessage}>{error}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header
        title={t('home.title')}
        subtitle={t('home.subtitle')}
      />
        {/*<UserGrid users={profiles} />*/}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFDFD"
  },
  scrollView: {
    flex: 1,
  },
  userGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 10,
    paddingBottom: 20,
    justifyContent: "space-between",
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
