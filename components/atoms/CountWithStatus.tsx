import { fonts } from "@/constants/fonts";
import { getScaledFontSize } from "@/constants/globalConstants";
import { globalStyleDefinitions } from "@/constants/globalStyleDefinitions";
import React, { memo } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { Text, useTheme } from "react-native-paper";
import Entypo from "react-native-vector-icons/Entypo";

const CountWithStatus = ({
  title,
  status,
  customStyle,
}: {
  title: string;
  status?: number | null;
  customStyle?: ViewStyle;
}) => {
  const theme = useTheme();
  return (
    <View style={[globalStyleDefinitions.flexRow_centerItem, customStyle]}>
      <Text style={[styles.titleText, { color: theme.colors.surface }]}>
        {title}
      </Text>
      {status !== undefined && status !== null && (
        <Entypo
          name={status == 1 ? "chevron-up" : "chevron-down"}
          size={24}
          color={status == 1 ? theme.colors.primary : theme.colors.secondary}
          style={{ marginLeft: 10 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontFamily: fonts.unboundedBold,
    fontSize: getScaledFontSize(24),
  },
});

export default memo(CountWithStatus);
