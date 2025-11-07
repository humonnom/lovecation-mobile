import * as React from "react";
import {Alert, Image, Linking, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useTranslation} from "react-i18next";
import Icon from "react-native-vector-icons/Ionicons";
import {PrivacyPolicyLink} from "./PrivacyPolicyLink";

interface InterestedUser {
  id: number;
  image: any;
}

const mockInterestedUsers: InterestedUser[] = [
  { id: 1, image: require("../assets/profiles/profile2.jpg") },
  { id: 2, image: require("../assets/profiles/profile3.jpg") },
  { id: 3, image: require("../assets/profiles/profile4.jpg") },
  { id: 4, image: require("../assets/profiles/profile5.jpg") },
  { id: 5, image: require("../assets/profiles/profile6.jpg") },
];

type InterestSectionBasicProps = {
  // lunchMessage: string;
  // simple?: boolean;
};

type InterestSectionProps = InterestSectionBasicProps &
  (
    | {
        onPressButton: () => void;
        buttonText: string;
        renderButton?: never;
      }
    | {
        onPressButton?: never;
        buttonText?: never;
        renderButton?: () => React.ReactNode;
      }
  );

const renderStackedAvatars = () => {
  const displayUsers = mockInterestedUsers.slice(0, 4);
  const remainingCount = Math.max(0, mockInterestedUsers.length - 4);


  return (
    <View style={styles.stackedAvatars}>
      {displayUsers.map((user, index) => {
          console.log(user.image);

          return (
              <View
                  key={user.id}
                  style={[styles.avatarContainer, { left: index * 20 }]}
              >
                  <Image source={user.image} style={styles.blurredAvatar} />
                  <View style={styles.blurOverlay} />
              </View>
          )
      })}
      {remainingCount > 0 && (
        <View
          style={[
            styles.avatarContainer,
            styles.remainingCount,
            { left: displayUsers.length * 20 },
          ]}
        >
          <Text style={styles.remainingText}>+{remainingCount}</Text>
        </View>
      )}
    </View>
  );
};

export const InterestSection = (props: InterestSectionProps) => {
  const { t } = useTranslation();

  const handleTypeformPress = async () => {
    const typeformUrl = 'https://form.typeform.com/to/GD1xzjd6';

    try {
      const supported = await Linking.canOpenURL(typeformUrl);

      if (supported) {
        await Linking.openURL(typeformUrl);
      } else {
        Alert.alert(t('interest.errorTitle'), t('interest.errorCannotOpen'));
      }
    } catch (error) {
      console.error('Error opening Typeform:', error);
      Alert.alert(t('interest.errorTitle'), t('interest.errorOpeningLink'));
    }
  };

  return (
    <View style={styles.interestSection}>
      <View style={styles.interestHeader}>
        <Text style={styles.interestTitle}>{t('interest.title')}</Text>
        {/*<Text style={styles.interestTitle}>받은 관심</Text>*/}
        {/*<Text style={styles.interestCount}>{mockInterestedUsers.length}명</Text>*/}
      </View>
      {/*{props.simple ? (*/}
      {/*  <View style={styles.interestContent}>*/}
      {/*    <View style={styles.interestText}>*/}
      {/*      {!props.simple && (*/}
      {/*        <Text style={styles.interestDescription}>*/}
      {/*          /!*이 분들이 회원님에게 관심을 보냈어요!*!/*/}
      {/*          /!*선착순 100명에게만 주어지는 무료 매칭 기회!*!/*/}
      {/*        </Text>*/}
      {/*      )}*/}
      {/*      <Text style={styles.launchMessage}>{props.lunchMessage}</Text>*/}
      {/*    </View>*/}
      {/*  </View>*/}
      {/*) : (*/}
        <View style={styles.interestContent}>
          {renderStackedAvatars()}
          <View style={styles.interestText}>
            <Text style={styles.interestDescription}>
              {t('interest.earlyBirdTitle')}
            </Text>
            <Text style={styles.launchMessage}>{t('interest.benefit1')}</Text>
            <Text style={styles.launchMessage}>{t('interest.benefit2')}</Text>
            <Text style={styles.launchMessage}>{t('interest.benefit3')}</Text>
          </View>
        </View>
      {/*)}*/}
      {/* Navigate to Profile Button */}
      {/*{props?.renderButton ? (*/}
      {/*  props.renderButton()*/}
      {/*) : (*/}
        <View style={styles.interestPrivacyPolicyLink}>
            <PrivacyPolicyLink />
        </View>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={handleTypeformPress}
        >
          <Icon name='person' size={20} color='white' />
          <Text style={styles.profileButtonText}>{t('interest.buttonText')}</Text>
          <Icon name='arrow-forward' size={20} color='white' />
        </TouchableOpacity>
      {/*)}*/}
    </View>
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
  interestSection: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  interestHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  interestTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  interestCount: {
    fontSize: 18,
    fontWeight: "600",
    color: "#EE9CA7",
  },
  interestContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  stackedAvatars: {
    position: "relative",
    width: 120,
    height: 50,
    marginRight: 16,
  },
  avatarContainer: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "white",
    overflow: "hidden",
  },
  blurredAvatar: {
    width: "100%",
    height: "100%",
  },
  blurOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  remainingCount: {
    backgroundColor: "#EE9CA7",
    justifyContent: "center",
    alignItems: "center",
  },
  remainingText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  interestText: {
    flex: 1,
  },
  interestDescription: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
    fontWeight: "500",
  },
  interestPrivacyPolicyLink : {
    width: "100%",
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 6,
  },
  launchMessage: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  profileButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EE9CA7",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 8,
  },
  profileButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
