import React from "react";
import {Image, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {useTranslation} from "react-i18next";
import Icon from "react-native-vector-icons/MaterialIcons";
import {InterestSection} from "./InterestSection";
import {Header} from "./Header";

interface EmptyScreenComponentProps {
  onNavigateToProfile: () => void;
  featureName: string;
  icon: string;
}
export const EmptyScreenComponent = ({
  onNavigateToProfile,
  featureName,
  icon,
}: EmptyScreenComponentProps) => {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <Header title={featureName} subtitle='' />

      <View style={styles.developmentBanner}>
        <Icon name='construction' size={24} color='#FF9800' />
        <Text style={styles.developmentText}>{t('common.inDevelopment')}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.iconContainer}>
            <Image
                source={require("../assets/icon.png")}
                style={styles.logoImage}
                resizeMode="contain"
            />
        </View>

        <Text style={styles.mainTitle}>{t('common.featureInProgress', { feature: featureName })}</Text>
        <Text style={styles.subtitle}>
          {t('common.pleaseWait')}
        </Text>

        <InterestSection
          // lunchMessage='지금 사전 신청하시고 정식 런치 알림을 받아보세요!'
          // onPressButton={onNavigateToProfile}
          // buttonText='프로필 페이지에서 신청하기'
          // simple
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFDFD",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#FDFDFD",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  developmentBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF3E0",
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    borderRadius: 12,
    gap: 8,
  },
  developmentText: {
    fontSize: 14,
    color: "#FF9800",
    fontWeight: "600",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  logoImage: {
    width: 120,
    height: 120,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 40,
  },
});
