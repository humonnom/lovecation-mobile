import * as React from "react"
import { View, StyleSheet } from "react-native"
import Svg, { Circle } from "react-native-svg"

interface FlagProps {
  size?: number
}

export const JapaneseFlag = ({ size = 24 }: FlagProps) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} viewBox="0 0 24 24">
        <Circle cx="12" cy="12" r="12" fill="white" />
        <Circle cx="12" cy="12" r="5" fill="#BC002D" />
      </Svg>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    borderRadius: 12,
  },
})
