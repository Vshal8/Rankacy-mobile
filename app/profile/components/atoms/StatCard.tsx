import BottomText from "@/components/atoms/BottomText";
import CountWithStatus from "@/components/atoms/CountWithStatus";
import HeaderIconWithText from "@/components/atoms/HeaderIconWithText";
import ProgressBar from "@/components/atoms/ProgressBar";
import { getScaledFontSize, windowWidth } from "@/constants/globalConstants";
import { globalStyleDefinitions } from "@/constants/globalStyleDefinitions";
import React, { memo } from "react";
import { ImageSourcePropType, StyleSheet, View, ViewStyle } from "react-native";

const StatCard = ({
  imagePath,
  title,
  val,
  avg,
  status,
  customStyle
}: {
  imagePath: ImageSourcePropType;
  title: string;
  status: number;
  val: number;
  avg: number;
  customStyle?: ViewStyle
}) => {
  return (
    <View style={[styles.container, customStyle]}>
      <HeaderIconWithText
        imagePath={imagePath}
        title={title}
        imageStyle={styles.image}
        textStyle={styles.headerText}
      />
      <CountWithStatus
        title={`${val}`}
        status={status}
        customStyle={{ marginTop: 5 }}
      />
      <ProgressBar avg={avg} val={val} status={status} />
      <BottomText text={`avg: ${avg}`} textStyle={styles.subText} />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 18,
    width: 18,
  },
  container: { width: windowWidth * 0.4, marginBottom: 20, marginTop: globalStyleDefinitions.mt_4.marginTop },
  subText: { textAlign: "center", marginTop: 10 },
  headerText: { fontSize: getScaledFontSize(14), marginLeft: 5 },
});

export default memo(StatCard);
