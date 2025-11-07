import * as React from "react"
import { useState } from "react"
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useTranslation } from "react-i18next"
import type { Profile } from "../../types"
import dummyData from "./dummyData.json"
import { UserDetailSkeleton } from "../../components/skeletons"

const { width } = Dimensions.get("window")

interface ProfileDetailProps {
    onClose?: () => void
}

// const descriptionDummy: Record<string, string> = {
//     femaleKR:"",
//     femaleJP:"こんにちは！私は日本から来た28歳の女性です。韓国の文化と食べ物が大好きで、一生懸命韓国語を勉強しています。旅行と写真を撮ることが好きで、新しい人と出会うことも楽しんでいます。私の理想のタイプはユーモアがあり、温かい人です。一緒にカフェデートや映画鑑賞を楽しめる人に出会いたいです！",
//     maleKR:"안녕하세요! 저는 일본에서 온 30세 남성입니다. 한국 드라마와 음악을 좋아해서 한국어도 공부하고 있어요. 운동과 등산을 즐기고, 맛있는 음식을 찾는 것도 좋아합니다. 제 이상형은 이해심 많고 긍정적인 분이에요. 함께 여행이나 운동을 즐길 수 있는 분을 만나고 싶어요!",
//     maleJP:"こんにちは！私は日本から来た30歳の男性です。韓国のドラマと音楽が好きで、韓国語も勉強しています。運動と登山を楽しみ、美味しい食べ物を探すことも好きです。私の理想のタイプは理解があり、ポジティブな人です。一緒に旅行や運動を楽しめる人に出会いたいです！"
// }

export const ProfileDetailPage = ({ onClose }: ProfileDetailProps) => {
    const navigation = useNavigation();
    const route = useRoute();
    const { t, i18n } = useTranslation();
    const user = (route.params as any)?.user as Profile | undefined;
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
    const [isKR, setIsKR] = useState(true)
    const [isLoading, setIsLoading] = useState(true)

    // Simulate loading state for skeleton
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 800);

        return () => clearTimeout(timer);
    }, [])

    console.log(user?.id);

    // Get user detail data from dummyData
    const userDetailData = user?.id ? dummyData[user.id as keyof typeof dummyData] : null;
    const currentLanguage = i18n.language; // 'ko' or 'ja'

    // Helper function to extract text without emoji (including flag emojis)
    const getTextWithoutEmoji = (text: string) => {
        // Remove all emojis including flag emojis (regional indicators)
        return text.replace(/[\u{1F300}-\u{1F9FF}\u{1F1E0}-\u{1F1FF}]/gu, '').trim();
    };

    // Helper function to get emoji from text (including flag emojis)
    const getEmoji = (text: string) => {
        const match = text.match(/[\u{1F300}-\u{1F9FF}\u{1F1E0}-\u{1F1FF}]+/gu);
        return match ? match.join('') : '';
    };

    // Language skills configuration
    const languageSkillsConfig = [
        { key: 'korean', labelKey: '한국어' },
        { key: 'japanese', labelKey: '일본어' },
        { key: 'english', labelKey: '영어' }
    ];

    // Get level text from level number
    const getLevelText = (level: number) => {
        const levelMap: Record<number, string> = {
            1: '초급',
            2: '초급',
            3: '중급',
            4: '고급',
            5: '원어민'
        };
        return levelMap[level] || '초급';
    };

    // Lifestyle configuration
    const lifestyleConfig = [
        { key: 'drinking', icon: 'local-bar', labelKey: '음주' },
        { key: 'smoking', icon: 'smoke-free', labelKey: '흡연' },
        { key: 'exercise', icon: 'fitness-center', labelKey: '운동' },
        { key: 'pet', icon: 'pets', labelKey: '반려동물' }
    ];

    // Future plans icons
    const futurePlansIcons: Record<string, string> = {
        'long_distance_ok': 'favorite',
        'visit_often': 'flight',
        'relocation_considering': 'home',
        'long_distance_serious': 'favorite',
        'visit_regularly': 'flight',
        'relocation_possible': 'home',
        'interested_in_life': 'home',
        'date_in_city': 'favorite',
        'weekend_travel': 'flight',
        'settled': 'home',
        'serious_relationship': 'favorite',
        'travel_together': 'flight',
        'stable_life': 'home',
        'long_distance_want': 'favorite',
        'visit_korea_often': 'flight',
        'working_holiday': 'home',
        'visit_japan_often': 'flight',
        'life_in_japan': 'home',
        'get_to_know_slowly': 'favorite',
        'plan_to_visit': 'flight',
        'want_to_experience': 'home',
        'welcome_visit': 'flight',
        'living_in_kyoto': 'home'
    };

    // Cultural preference labels based on nationality
    const getCulturalPreferenceLabels = (nationality: string) => {
        if (nationality === 'JP') {
            return [
                { key: 'food', emoji: '🍗', labelKey: '한국 음식' },
                { key: 'entertainment', emoji: '🎵', labelKey: 'K-pop/드라마' },
                { key: 'culture', emoji: '🇰🇷', labelKey: '한국 문화 이해도' }
            ];
        } else {
            return [
                { key: 'food', emoji: '🍜', labelKey: '일본 음식' },
                { key: 'entertainment', emoji: '🎬', labelKey: '애니메이션/만화' },
                { key: 'culture', emoji: '🇯🇵', labelKey: '일본 문화 이해도' }
            ];
        }
    };

    const photos = [
        { uri: "/placeholder.svg?height=500&width=400" },
        { uri: "/placeholder.svg?height=500&width=400" },
        { uri: "/placeholder.svg?height=500&width=400" },
        { uri: "/placeholder.svg?height=500&width=400" },
    ]

    const handleClose = () => {
        if (onClose) {
            onClose();
        } else {
            navigation.goBack();
        }
    };

    // Show skeleton while loading
    if (isLoading) {
        return <UserDetailSkeleton />;
    }

    // Show loading or placeholder if no user data
    if (!user) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleClose} style={styles.backButton}>
                        <Icon name="arrow-back" size={24} color="#333" />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text>{t('userDetail.errorLoadingUser')}</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={handleClose} style={styles.backButton}>
                    <Icon name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                {/*<TouchableOpacity style={styles.moreButton}>*/}
                {/*    <Icon name="more-vert" size={24} color="#333" />*/}
                {/*</TouchableOpacity>*/}
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Photo Gallery */}
                <View style={styles.photoContainer}>
                    <Image
                        source={
                            user.avatar_url.startsWith('http')
                                ? { uri: user.avatar_url }
                                : photos[currentPhotoIndex]
                        }
                        style={styles.mainPhoto}
                    />

                    {/* Demo Badge */}
                    <View style={styles.demoBadge}>
                        <Text style={styles.demoBadgeText}>{t('userDetail.demo')}</Text>
                    </View>

                    {/* Online Status */}
                    {user.is_online && (
                        <View style={styles.onlineStatus}>
                            <View style={styles.onlineDot} />
                            <Text style={styles.onlineText}>{t('userDetail.online')}</Text>
                        </View>
                    )}

                    {/* Photo Indicators */}
                    <View style={styles.photoIndicators}>
                        {photos.map((_, index) => (
                            <View key={index} style={[styles.indicator, currentPhotoIndex === index && styles.activeIndicator]} />
                        ))}
                    </View>
                </View>

                {/* Basic Info */}
                <View style={styles.section}>
                    <View style={styles.nameContainer}>
                        <Text style={styles.name}>{user.first_name && user.last_name ? `${user.first_name} ${user.last_name}` : user.nickname}</Text>
                        <Text style={styles.nameRomanized}>{user.name_reading}</Text>
                    </View>
                    <View style={styles.basicInfo}>
                        {user.age && (
                            <View style={styles.infoItem}>
                                <Icon name="cake" size={18} color="#666" />
                                <Text style={styles.infoText}>{user.age}{t('userDetail.age')}</Text>
                            </View>
                        )}
                        {user.city && user.nationality && (
                            <View style={styles.infoItem}>
                                <Icon name="place" size={18} color="#666" />
                                <Text style={styles.infoText}>{user.city}, {user.nationality}</Text>
                            </View>
                        )}
                    </View>
                </View>

                {/* About Me */}
                {userDetailData?.descriptions && (
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>{t('userDetail.aboutMe')}</Text>
                            <TouchableOpacity style={styles.translateButton} onPress={() => setIsKR(!isKR)}>
                                <Icon name="translate" size={16} color="#EE9CA7" />
                                <Text style={styles.translateButtonText}>{isKR? "KR" : "JP"}</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.aboutText}>
                            {isKR ? userDetailData.descriptions.ko : userDetailData.descriptions.ja}
                        </Text>
                        <Text style={styles.translationNote}>
                            <Icon name="info-outline" size={12} color="#999" /> {t('userDetail.translationNote')}
                        </Text>
                    </View>
                )}

                {/* Interests */}
                {userDetailData?.interests && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>{t('userDetail.interests')}</Text>
                        <View style={styles.tagsContainer}>
                            {userDetailData.interests.map((interestKey, index) => {
                                const translated = t(`userDetail.interestsList.${interestKey}`);
                                return (
                                    <View key={index} style={styles.tag}>
                                        <Text style={styles.tagText}>#{translated}</Text>
                                    </View>
                                );
                            })}
                        </View>
                    </View>
                )}

                {/* Language Skills */}
                {userDetailData?.languageSkills && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>{t('userDetail.languageSkills')}</Text>
                        {languageSkillsConfig.map((langConfig) => {
                            const level = userDetailData.languageSkills[langConfig.key as keyof typeof userDetailData.languageSkills];
                            if (!level) return null;

                            const levelText = getLevelText(level);
                            const translatedLanguage = t(`userDetail.languages.${langConfig.labelKey}`, langConfig.labelKey);
                            const translatedLevel = t(`userDetail.levels.${levelText}`, levelText);

                            return (
                                <View key={langConfig.key} style={styles.languageItem}>
                                    <Text style={styles.languageLabel}>
                                        {translatedLanguage}
                                    </Text>
                                    <View style={styles.starsContainer}>
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Icon key={star} name="star" size={18} color={star <= level ? "#FFB800" : "#E0E0E0"} />
                                        ))}
                                    </View>
                                    <Text style={styles.languageLevel}>
                                        {translatedLevel}
                                    </Text>
                                </View>
                            );
                        })}
                    </View>
                )}

                {/* Cultural Preferences */}
                {userDetailData?.culturalPreferences && user?.nationality && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>{t('userDetail.culturalPreferences')}</Text>
                        {getCulturalPreferenceLabels(user.nationality).map((item) => {
                            const preferences = userDetailData.culturalPreferences[user.nationality as keyof typeof userDetailData.culturalPreferences];
                            const percentage = preferences?.[item.key as keyof typeof preferences];
                            if (percentage === undefined) return null;

                            const translatedText = t(`userDetail.culturalLabels.${item.labelKey}`, item.labelKey);
                            return (
                                <View key={item.key} style={styles.preferenceItem}>
                                    <Text style={styles.preferenceLabel}>{item.emoji} {translatedText}</Text>
                                    <View style={styles.preferenceBar}>
                                        <View style={[styles.preferenceBarFill, { width: `${percentage}%` }]} />
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                )}

                {/* Lifestyle */}
                {userDetailData?.lifestyle && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>{t('userDetail.lifestyle')}</Text>
                        <View style={styles.lifestyleGrid}>
                            {lifestyleConfig.map((config) => {
                                const value = userDetailData.lifestyle[config.key as keyof typeof userDetailData.lifestyle];
                                if (!value) return null;

                                const translatedLabel = t(`userDetail.lifestyleLabels.${config.labelKey}`, config.labelKey);
                                const translatedValue = t(`userDetail.lifestyleValues.${value}`, value);

                                return (
                                    <View key={config.key} style={styles.lifestyleItem}>
                                        <Icon name={config.icon} size={24} color="#666" />
                                        <Text style={styles.lifestyleLabel}>{translatedLabel}</Text>
                                        <Text style={styles.lifestyleValue}>{translatedValue}</Text>
                                    </View>
                                );
                            })}
                        </View>
                    </View>
                )}

                {/* Future Plans */}
                {userDetailData?.futurePlans && user?.nationality && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>{t('userDetail.futurePlans')}</Text>
                        {userDetailData.futurePlans[user.nationality as keyof typeof userDetailData.futurePlans]?.map((planKey, index) => {
                            const icon = futurePlansIcons[planKey] || 'favorite';
                            const translatedText = t(`userDetail.futurePlansList.${user.nationality}.${planKey}`, planKey);

                            return (
                                <View key={index} style={styles.planItem}>
                                    <Icon name={icon} size={20} color="#EE9CA7" />
                                    <Text style={styles.planText}>{translatedText}</Text>
                                </View>
                            );
                        })}
                    </View>
                )}

                {/* Ideal Type */}
                {userDetailData?.idealType && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>{t('userDetail.idealType')}</Text>
                        <Text style={styles.idealTypeText}>
                            • {t('userDetail.idealTypeLabels.ageRange')}: {userDetailData.idealType.ageRange}{t('userDetail.age')}
                        </Text>
                        <Text style={styles.idealTypeText}>
                            • {t('userDetail.idealTypeLabels.personality')}: {t(`userDetail.idealTypeData.personalities.${userDetailData.idealType.personality}`, userDetailData.idealType.personality)}
                        </Text>
                        <Text style={styles.idealTypeText}>
                            • {t('userDetail.idealTypeLabels.dateStyle')}: {t(`userDetail.idealTypeData.dateStyles.${userDetailData.idealType.dateStyle}`, userDetailData.idealType.dateStyle)}
                        </Text>
                    </View>
                )}

                {/* Demo Notice */}
                <View style={styles.demoNotice}>
                    <Icon name="info" size={20} color="#FF9800" />
                    <Text style={styles.demoNoticeText}>
                        {t('userDetail.demoNotice')}
                    </Text>
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
                {/*<TouchableOpacity style={styles.actionButton}>*/}
                {/*    <Icon name="close" size={32} color="#FF6B6B" />*/}
                {/*</TouchableOpacity>*/}
                {/*<TouchableOpacity style={styles.actionButton}>*/}
                {/*    <Icon name="star" size={32} color="#FFB800" />*/}
                {/*</TouchableOpacity>*/}
                {/*<TouchableOpacity style={[styles.actionButton, styles.likeButton]}>*/}
                {/*    <Icon name="favorite" size={32} color="white" />*/}
                {/*</TouchableOpacity>*/}
                {/*<TouchableOpacity style={styles.actionButton}>*/}
                {/*    <Icon name="chat-bubble" size={32} color="#EE9CA7" />*/}
                {/*</TouchableOpacity>*/}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FDFDFD",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 12,
    },
    backButton: {
        padding: 8,
    },
    moreButton: {
        padding: 8,
    },
    photoContainer: {
        position: "relative",
        width: width,
        height: 500,
    },
    mainPhoto: {
        width: "100%",
        height: "100%",
    },
    demoBadge: {
        position: "absolute",
        top: 20,
        right: 20,
        backgroundColor: "#FF9800",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    demoBadgeText: {
        color: "white",
        fontSize: 12,
        fontWeight: "bold",
    },
    onlineStatus: {
        position: "absolute",
        bottom: 20,
        left: 20,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    onlineDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#4CAF50",
        marginRight: 6,
    },
    onlineText: {
        color: "white",
        fontSize: 12,
        fontWeight: "600",
    },
    photoIndicators: {
        position: "absolute",
        top: 12,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "center",
        gap: 6,
    },
    indicator: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: "rgba(255, 255, 255, 0.5)",
    },
    activeIndicator: {
        backgroundColor: "white",
        width: 24,
    },
    section: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#F0F0F0",
    },
    nameContainer: {
        marginBottom: 12,
    },
    name: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 4,
    },
    nameRomanized: {
        fontSize: 16,
        color: "#666",
    },
    basicInfo: {
        gap: 8,
    },
    infoItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    infoText: {
        fontSize: 16,
        color: "#666",
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 12,
    },
    translateButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    translateButtonText: {
        fontSize: 14,
        color: "#EE9CA7",
        fontWeight: "600",
    },
    aboutText: {
        fontSize: 16,
        color: "#333",
        lineHeight: 24,
        marginBottom: 8,
    },
    translationNote: {
        fontSize: 12,
        color: "#999",
        fontStyle: "italic",
    },
    tagsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
    },
    tag: {
        backgroundColor: "#FFCBD2",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    tagText: {
        fontSize: 14,
        color: "#EE9CA7",
        fontWeight: "600",
    },
    languageItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    languageLabel: {
        fontSize: 16,
        color: "#333",
        width: 80,
    },
    starsContainer: {
        flexDirection: "row",
        gap: 2,
        marginRight: 12,
    },
    languageLevel: {
        fontSize: 14,
        color: "#666",
    },
    preferenceItem: {
        marginBottom: 16,
    },
    preferenceLabel: {
        fontSize: 16,
        color: "#333",
        marginBottom: 8,
    },
    preferenceBar: {
        height: 8,
        backgroundColor: "#F0F0F0",
        borderRadius: 4,
        overflow: "hidden",
    },
    preferenceBarFill: {
        height: "100%",
        backgroundColor: "#EE9CA7",
        borderRadius: 4,
    },
    lifestyleGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
    },
    lifestyleItem: {
        width: "48%",
        backgroundColor: "#FAFAFA",
        padding: 16,
        borderRadius: 12,
        alignItems: "center",
    },
    lifestyleLabel: {
        fontSize: 14,
        color: "#666",
        marginTop: 8,
        marginBottom: 4,
    },
    lifestyleValue: {
        fontSize: 16,
        color: "#333",
        fontWeight: "600",
    },
    planItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 12,
    },
    planText: {
        fontSize: 16,
        color: "#333",
    },
    idealTypeText: {
        fontSize: 16,
        color: "#333",
        lineHeight: 24,
        marginBottom: 8,
    },
    demoNotice: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFF3E0",
        padding: 16,
        marginHorizontal: 20,
        marginVertical: 16,
        borderRadius: 12,
        gap: 12,
    },
    demoNoticeText: {
        flex: 1,
        fontSize: 14,
        color: "#FF9800",
        lineHeight: 20,
    },
    actionButtons: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 16,
        paddingHorizontal: 20,
        backgroundColor: "white",
        borderTopWidth: 1,
        borderTopColor: "#F0F0F0",
        gap: 12,
    },
    actionButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    likeButton: {
        backgroundColor: "#EE9CA7",
        width: 70,
        height: 70,
        borderRadius: 35,
    },
})
