import { fonts } from "@/constants/fonts";
import { getScaledFontSize } from "@/constants/globalConstants";
import { globalStyleDefinitions } from "@/constants/globalStyleDefinitions";
import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

const CommonHeader = ({ title }: { title: string }) => {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.colors.surface }]}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyleDefinitions.flexRow_centerItem,
    justifyContent: "center",
    padding: globalStyleDefinitions.screenPadding.padding,
  },
  title: {
    fontFamily: fonts.sansBold,
    fontSize: getScaledFontSize(16),
  },
});

export default memo(CommonHeader);
