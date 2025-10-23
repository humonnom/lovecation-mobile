import * as React from "react"
import { TouchableOpacity, Text, StyleSheet } from "react-native"
import {Locale as LocaleType, LOCALES} from "../i18n/constants"
import {KoreanFlag, JapaneseFlag} from "./flags";
import {useTranslation} from "react-i18next";

const localeConfig = {
    ko: {
        flag: KoreanFlag,
        label: "한국어",
    },
    ja: {
        flag: JapaneseFlag,
        label: "日本語",
    },
}

const Locale = () => {
    const { i18n } = useTranslation()
    const currentLocale = i18n.language as LocaleType
    const newLocale = currentLocale === LOCALES.KO ? LOCALES.JA : LOCALES.KO

    const toggleLocale = () => {
        i18n.changeLanguage(newLocale)
    }
    const config = localeConfig[newLocale]

    return (
        <TouchableOpacity style={styles.container} onPress={toggleLocale} activeOpacity={0.7}>
            {React.createElement(config.flag, { size: 24 })}
            <Text style={styles.label}>{config.label}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
        gap: 6,
    },
    label: {
        fontSize: 14,
        color: "#333",
        fontWeight: "600",
    },
})

export default Locale
