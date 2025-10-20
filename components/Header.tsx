import * as React from "react"
import { View, Text, StyleSheet } from "react-native"
import Locale from "./Locale"

interface HeaderProps {
  title: string
  subtitle: string
}

export const Header = (props: HeaderProps) => {


  return (
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>{props.title}</Text>
          <Text style={styles.headerSubtitle}>{props.subtitle}</Text>
        </View>

        <View style={styles.headerRight}>
          <Locale />
        </View>
      </View>
  )
}

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
})
