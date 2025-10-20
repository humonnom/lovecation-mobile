import * as React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import { useTranslation } from "react-i18next";
import Icon from "react-native-vector-icons/MaterialIcons";
import { InterestSection } from "../../components/InterestSection";
import { Header } from "../../components/Header";
import {supabase} from "../../lib/supabase";
import {useUserProfile} from "../../hooks/queries";

export const ProfileScreen = () => {
  const { t } = useTranslation();
  const { profile, loading, updateProfile, displayName, avatarUrl } = useUserProfile();

  const [hasRequestedLaunch, setHasRequestedLaunch] = React.useState(false);

  const handleLaunchRequest = () => {
    setHasRequestedLaunch(true);
    Alert.alert(
      t('profile.launchRequestComplete'),
      t('profile.launchRequestMessage')
    );
  };

  const handleLogout = () => {
    Alert.alert(
        t('profile.logout'),
        t('profile.logoutConfirm'),
        [
          {
            text: t('profile.cancel'),
            style: "cancel"
          },
          {
            text: t('profile.logout'),
            style: "destructive",
            onPress: async() => {
                await supabase.auth.signOut();
                Alert.alert(t('profile.logoutSuccess'), t('profile.logoutSuccessMessage'));
            }
          }
        ]
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title={t('profile.title')} subtitle={t('profile.subtitle')} />

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.profileImageContainer}>
          <Image
            source={
              avatarUrl
                ? { uri: avatarUrl }
                : require("../../assets/profiles/man-profile2.jpg")
            }
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.editButton}>
            <Icon name='edit' size={16} color='#666' />
          </TouchableOpacity>
        </View>
        <Text style={styles.profileName}>
          {displayName} {profile?.age}
        </Text>
        <Text style={styles.profileLocation}>
          {profile?.city || t('profile.noLocation')}
        </Text>
      </View>

      <View style={styles.interestSection}>
        <InterestSection
        //  lunchMessage='앱 정식 런치 후, 매치된 분들과 연결될 수 있어요.'
        //   renderButton={() => (
        //     <TouchableOpacity
        //       style={[
        //         styles.launchButton,
        //         hasRequestedLaunch && styles.launchButtonDisabled,
        //       ]}
        //       onPress={handleLaunchRequest}
        //       disabled={hasRequestedLaunch}
        //     >
        //       <Icon
        //         name={hasRequestedLaunch ? "check-circle" : "notifications"}
        //         size={20}
        //         color={hasRequestedLaunch ? "#4CAF50" : "white"}
        //       />
        //       <Text
        //         style={[
        //           styles.launchButtonText,
        //           hasRequestedLaunch && styles.launchButtonTextDisabled,
        //         ]}
        //       >
        //         {hasRequestedLaunch
        //           ? "정식 런치 희망 완료"
        //           : "정식 런치 희망하기"}
        //       </Text>
        //     </TouchableOpacity>
        //   )}
        />
      </View>

      <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="logout" size={20} color="#666" />
          <Text style={styles.logoutText}>{t('profile.logout')}</Text>
        </TouchableOpacity>
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
  profileSection: {
    alignItems: "center",
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  profileImageContainer: {
    position: "relative",
    marginBottom: 16,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#FFCBD2",
  },
  editButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  profileLocation: {
    fontSize: 16,
    color: "#666",
  },
  interestSection: {
    margin: 20,
  },
  launchMessage: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  launchButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EE9CA7",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 8,
  },
  launchButtonDisabled: {
    backgroundColor: "#F0F0F0",
  },
  launchButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  launchButtonTextDisabled: {
    color: "#4CAF50",
  },

  logoutContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
});
