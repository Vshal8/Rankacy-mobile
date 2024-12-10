import BottomText from "@/components/atoms/BottomText";
import CountWithStatus from "@/components/atoms/CountWithStatus";
import { fonts } from "@/constants/fonts";
import { getScaledFontSize } from "@/constants/globalConstants";
import { globalStyleDefinitions } from "@/constants/globalStyleDefinitions";
import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

const ListCard = ({ item, status }: { item?: any; status: number }) => {
  const theme = useTheme();
  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={globalStyleDefinitions.flexFull}>
        <Text
          style={[
            styles.title,
            {
              color:
                status == 1 ? theme.colors.primary : theme.colors.secondary,
            },
          ]}
        >
          {item?.name}
        </Text>
        <BottomText
          text={item?.description}
          textStyle={globalStyleDefinitions.mt_4}
        />
      </View>
      <CountWithStatus
        title={`${parseInt(item?.current).toString()}${item?.unit == "percentage" ? "%" : ""}`}
        status={status}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyleDefinitions.flexRow_centerItem,
    justifyContent: "space-between",
    borderRadius: globalStyleDefinitions.br_16.borderRadius,
    marginTop: 10,
    padding: globalStyleDefinitions.screenPadding.padding,
  },
  title: { fontFamily: fonts.unboundedMedium, fontSize: getScaledFontSize(14) },
});

export default memo(ListCard);
