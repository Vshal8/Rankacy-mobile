import { fonts } from "@/constants/fonts";
import { getScaledFontSize } from "@/constants/globalConstants";
import React, { memo } from "react";
import { StyleSheet, TextStyle } from "react-native";
import { Text, useTheme } from "react-native-paper";

const BottomText = ({
  text,
  textStyle,
}: {
  text: string;
  textStyle?: TextStyle;
}) => {
  const theme = useTheme();
  return (
    <Text style={[styles.text, textStyle, { color: theme.colors.onSurface }]}>
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: fonts.sansRegular,
    fontSize: getScaledFontSize(12),
  },
});

export default memo(BottomText);
