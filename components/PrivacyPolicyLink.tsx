import * as React from 'react'
import {Alert, Linking, StyleSheet, Text, TouchableOpacity} from "react-native"
import {useTranslation} from "react-i18next";

interface PrivacyPolicyLinkProps {
    textBefore?: string
    linkText?: string
    textAfter?: string
    fontSize?: number
    align?: "left" | "center" | "right"
    url?: string
}

export const PrivacyPolicyLink = ({
                                      textBefore = "",
                                      textAfter = "",
                                      fontSize = 13,
                                      align = "center",
                                      url = "https://pear-capricorn-258.notion.site/Lovecation-2a488780379980e8bca2c9f9a8da544a?pvs=73",
                                  }: PrivacyPolicyLinkProps) => {
    const { t } = useTranslation();
    const handlePress = async () => {
        try {
            const supported = await Linking.canOpenURL(url)
            if (supported) {
                await Linking.openURL(url)
            } else {
                Alert.alert("오류", "URL을 열 수 없습니다.")
            }
        } catch (error) {
            Alert.alert("오류", "링크를 여는 중 문제가 발생했습니다.")
        }
    }

    return (
        <Text style={[styles.container, { fontSize, textAlign: align }]}>
            {textBefore && <Text style={styles.normalText}>{textBefore}</Text>}
            <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
                <Text style={[styles.linkText, { fontSize }]}>{t('common.privacyPolicy')}</Text>
            </TouchableOpacity>
            {textAfter && <Text style={styles.normalText}>{textAfter}</Text>}
        </Text>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
    },
    normalText: {
        color: "#666",
    },
    linkText: {
        color: "#EE9CA7",
        textDecorationLine: "underline",
        fontWeight: "500",
    },
})
