import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { LOCALES, type Locale as LocaleType } from "../i18n/constants";
import Locale from "./Locale";

interface HeaderProps {
  title: string;
  subtitle: string;
}

export const Header = (props: HeaderProps) => {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language as LocaleType;

  const toggleLocale = () => {
    const newLocale = currentLocale === LOCALES.KO ? LOCALES.JA : LOCALES.KO;
    i18n.changeLanguage(newLocale);
  };

  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <Text style={styles.headerTitle}>{props.title}</Text>
        <Text style={styles.headerSubtitle}>{props.subtitle}</Text>
      </View>

      <View style={styles.headerRight}>
        <Locale locale={currentLocale} toggle={toggleLocale} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#FDFDFD",
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#666",
  },
});
