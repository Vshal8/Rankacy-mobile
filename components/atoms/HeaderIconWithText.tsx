import { fonts } from "@/constants/fonts";
import { getScaledFontSize } from "@/constants/globalConstants";
import { globalStyleDefinitions } from "@/constants/globalStyleDefinitions";
import React, { memo } from "react";
import { Image, ImageStyle, StyleSheet, TextStyle, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

const HeaderIconWithText = ({
  imagePath,
  title,
  imageStyle,
  textStyle,
}: {
  imagePath: any;
  title: string;
  imageStyle?: ImageStyle;
  textStyle?: TextStyle;
}) => {
  const theme = useTheme();
  return (
    <View style={globalStyleDefinitions.flexRow_centerItem}>
      <Image
        source={imagePath}
        style={[{ height: 16, width: 16 }, imageStyle]}
      />
      <Text style={[styles.text, textStyle, { color: theme.colors.surface }]}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: fonts.sansSemiBold,
    marginLeft: globalStyleDefinitions.ml_2.marginLeft,
    fontSize: getScaledFontSize(12),
  },
});

export default memo(HeaderIconWithText);
