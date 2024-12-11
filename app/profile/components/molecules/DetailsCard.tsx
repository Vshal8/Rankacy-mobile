import BottomText from "@/components/atoms/BottomText";
import CountWithStatus from "@/components/atoms/CountWithStatus";
import HeaderIconWithText from "@/components/atoms/HeaderIconWithText";
import { globalStyleDefinitions } from "@/constants/globalStyleDefinitions";
import React, { memo } from "react";
import { ImageSourcePropType, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";

const DetailCard = ({
  title,
  imagePath,
  subText,
  status,
  count,
  RightComponent,
}: {
  title: string;
  imagePath: ImageSourcePropType;
  subText: string;
  status: number;
  count: string;
  RightComponent?: () => JSX.Element;
}) => {
  const theme = useTheme();
  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.backdrop }]}
    >
      <View style={styles.seprator}>
        <HeaderIconWithText imagePath={imagePath} title={title} />
        <CountWithStatus title={count} status={status} />
        <BottomText text={subText} />
      </View>
      {RightComponent && <RightComponent />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyleDefinitions.flexRow_centerItem,
    justifyContent: "space-between",

    borderRadius: globalStyleDefinitions.br_16.borderRadius,
    marginTop: globalStyleDefinitions.mt_4.marginTop,
    padding: globalStyleDefinitions.screenPadding.padding,
  },
  seprator: {
    marginRight: 30,
  },
});

export default memo(DetailCard);
