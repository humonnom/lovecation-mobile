import * as React from "react"
import { useState } from "react"
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import { useNavigation, useRoute } from "@react-navigation/native"
import type { Profile } from "../../types"

const { width } = Dimensions.get("window")

interface ProfileDetailProps {
    onClose?: () => void
}

const descriptionDummy: Record<string, string> = {
    femaleKR:"안녕하세요! 저는 일본에서 온 28세 여성입니다. 한국 문화와 음식을 정말 좋아해서 한국어도 열심히 공부하고 있어요. 여행과 사진 찍는 것을 좋아하고, 새로운 사람들을 만나는 것도 즐깁니다. 제 이상형은 유머러스하고 따뜻한 분이에요. 함께 카페 데이트나 영화 감상을 즐길 수 있는 분을 만나고 싶어요!",
    femaleJP:"こんにちは！私は日本から来た28歳の女性です。韓国の文化と食べ物が大好きで、一生懸命韓国語を勉強しています。旅行と写真を撮ることが好きで、新しい人と出会うことも楽しんでいます。私の理想のタイプはユーモアがあり、温かい人です。一緒にカフェデートや映画鑑賞を楽しめる人に出会いたいです！",
    maleKR:"안녕하세요! 저는 일본에서 온 30세 남성입니다. 한국 드라마와 음악을 좋아해서 한국어도 공부하고 있어요. 운동과 등산을 즐기고, 맛있는 음식을 찾는 것도 좋아합니다. 제 이상형은 이해심 많고 긍정적인 분이에요. 함께 여행이나 운동을 즐길 수 있는 분을 만나고 싶어요!",
    maleJP:"こんにちは！私は日本から来た30歳の男性です。韓国のドラマと音楽が好きで、韓国語も勉強しています。運動と登山を楽しみ、美味しい食べ物を探すことも好きです。私の理想のタイプは理解があり、ポジティブな人です。一緒に旅行や運動を楽しめる人に出会いたいです！"
}

export const ProfileDetailPage = ({ onClose }: ProfileDetailProps) => {
    const navigation = useNavigation();
    const route = useRoute();
    const user = (route.params as any)?.user as Profile | undefined;
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
    const [isKR, setIsKR] = useState(true)

    const photos = [
        { uri: "/placeholder.svg?height=500&width=400" },
        { uri: "/placeholder.svg?height=500&width=400" },
        { uri: "/placeholder.svg?height=500&width=400" },
        { uri: "/placeholder.svg?height=500&width=400" },
    ]

    const interests = ["K드라마", "여행", "카페", "요리", "한국어공부", "사진", "음악"]

    const handleClose = () => {
        if (onClose) {
            onClose();
        } else {
            navigation.goBack();
        }
    };

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
                    <Text>유저 정보를 불러올 수 없습니다</Text>
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
                        <Text style={styles.demoBadgeText}>DEMO</Text>
                    </View>

                    {/* Online Status */}
                    {user.is_online && (
                        <View style={styles.onlineStatus}>
                            <View style={styles.onlineDot} />
                            <Text style={styles.onlineText}>온라인</Text>
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
                                <Text style={styles.infoText}>{user.age}세</Text>
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
                {user.description && (
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>About Me</Text>
                            <TouchableOpacity style={styles.translateButton} onPress={() => setIsKR(!isKR)}>
                                <Icon name="translate" size={16} color="#EE9CA7" />
                                <Text style={styles.translateButtonText}>{isKR? "KR" : "JP"}</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.aboutText}>
                            {descriptionDummy[`${user.gender}${isKR ? "JP" : "KR"}`]}
                        </Text>
                        <Text style={styles.translationNote}>
                            <Icon name="info-outline" size={12} color="#999" /> 이 프로필은 자동 번역되었습니다
                        </Text>
                    </View>
                )}

                {/* Interests */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>관심사 & 취미</Text>
                    <View style={styles.tagsContainer}>
                        {interests.map((interest, index) => (
                            <View key={index} style={styles.tag}>
                                <Text style={styles.tagText}>#{interest}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Language Skills */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>언어 능력</Text>
                    <View style={styles.languageItem}>
                        <Text style={styles.languageLabel}>한국어</Text>
                        <View style={styles.starsContainer}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Icon key={star} name="star" size={18} color={star <= 3 ? "#FFB800" : "#E0E0E0"} />
                            ))}
                        </View>
                        <Text style={styles.languageLevel}>중급</Text>
                    </View>
                    <View style={styles.languageItem}>
                        <Text style={styles.languageLabel}>일본어</Text>
                        <View style={styles.starsContainer}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Icon key={star} name="star" size={18} color="#FFB800" />
                            ))}
                        </View>
                        <Text style={styles.languageLevel}>원어민</Text>
                    </View>
                    <View style={styles.languageItem}>
                        <Text style={styles.languageLabel}>영어</Text>
                        <View style={styles.starsContainer}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Icon key={star} name="star" size={18} color={star <= 2 ? "#FFB800" : "#E0E0E0"} />
                            ))}
                        </View>
                        <Text style={styles.languageLevel}>초급</Text>
                    </View>
                </View>

                {/* Cultural Preferences */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>문화 선호도</Text>
                    <View style={styles.preferenceItem}>
                        <Text style={styles.preferenceLabel}>🍗 한국 음식</Text>
                        <View style={styles.preferenceBar}>
                            <View style={[styles.preferenceBarFill, { width: "90%" }]} />
                        </View>
                    </View>
                    <View style={styles.preferenceItem}>
                        <Text style={styles.preferenceLabel}>🎵 K-pop/드라마</Text>
                        <View style={styles.preferenceBar}>
                            <View style={[styles.preferenceBarFill, { width: "85%" }]} />
                        </View>
                    </View>
                    <View style={styles.preferenceItem}>
                        <Text style={styles.preferenceLabel}>🇰🇷 한국 문화 이해도</Text>
                        <View style={styles.preferenceBar}>
                            <View style={[styles.preferenceBarFill, { width: "80%" }]} />
                        </View>
                    </View>
                </View>

                {/* Lifestyle */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>라이프스타일</Text>
                    <View style={styles.lifestyleGrid}>
                        <View style={styles.lifestyleItem}>
                            <Icon name="local-bar" size={24} color="#666" />
                            <Text style={styles.lifestyleLabel}>음주</Text>
                            <Text style={styles.lifestyleValue}>가끔</Text>
                        </View>
                        <View style={styles.lifestyleItem}>
                            <Icon name="smoke-free" size={24} color="#666" />
                            <Text style={styles.lifestyleLabel}>흡연</Text>
                            <Text style={styles.lifestyleValue}>안함</Text>
                        </View>
                        <View style={styles.lifestyleItem}>
                            <Icon name="fitness-center" size={24} color="#666" />
                            <Text style={styles.lifestyleLabel}>운동</Text>
                            <Text style={styles.lifestyleValue}>주 2-3회</Text>
                        </View>
                        <View style={styles.lifestyleItem}>
                            <Icon name="pets" size={24} color="#666" />
                            <Text style={styles.lifestyleLabel}>반려동물</Text>
                            <Text style={styles.lifestyleValue}>고양이 🐱</Text>
                        </View>
                    </View>
                </View>

                {/* Future Plans */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>미래 계획</Text>
                    <View style={styles.planItem}>
                        <Icon name="favorite" size={20} color="#EE9CA7" />
                        <Text style={styles.planText}>장거리 연애 가능해요</Text>
                    </View>
                    <View style={styles.planItem}>
                        <Icon name="flight" size={20} color="#EE9CA7" />
                        <Text style={styles.planText}>{user.nationality === 'JP' ? "한국 방문 자주 해요" : "일본 방문 자주 해요"} </Text>
                    </View>
                    <View style={styles.planItem}>
                        <Icon name="home" size={20} color="#EE9CA7" />
                        <Text style={styles.planText}>{user.nationality === 'JP' ? "나중에 한국 이주 고려 중" : "나중에 일본 이주 고려 중"}</Text>
                    </View>
                </View>

                {/* Ideal Type */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>이상형</Text>
                    <Text style={styles.idealTypeText}>• 나이 범위: 24-32세</Text>
                    <Text style={styles.idealTypeText}>• 성격: 유머러스하고 따뜻한 분</Text>
                    <Text style={styles.idealTypeText}>• 데이트 스타일: 카페 데이트, 영화 감상</Text>
                </View>

                {/* Demo Notice */}
                <View style={styles.demoNotice}>
                    <Icon name="info" size={20} color="#FF9800" />
                    <Text style={styles.demoNoticeText}>
                        실제 서비스에서는 실시간 번역 제공 및 더 많은 프로필을 확인할 수 있습니다
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
