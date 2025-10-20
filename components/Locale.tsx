import {Text, TouchableOpacity, StyleSheet} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as React from "react";
import { LOCALES, type Locale as LocaleType } from "../i18n/constants";

type LocaleProps = {
    locale: LocaleType;
    toggle: () => void;
}


const Locale = ({locale, toggle}: LocaleProps) => {
    return (
            <TouchableOpacity style={styles.localeToggle} onPress={toggle}>
                <Text style={styles.localeText}>{locale === LOCALES.KO ? "한국어" : "日本語"}</Text>
                <Icon name="language" size={20} color="#EE9CA7" />
            </TouchableOpacity>
    )
}

export default Locale;
const styles = StyleSheet.create({
    localeToggle: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFCBD2",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        gap: 6,
    },
    localeText: {
        fontSize: 14,
        color: "#EE9CA7",
        fontWeight: "600",
    },
});

