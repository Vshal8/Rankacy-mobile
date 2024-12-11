import BottomText from "@/components/atoms/BottomText";
import CountWithStatus from "@/components/atoms/CountWithStatus";
import { fonts } from "@/constants/fonts";
import { getScaledFontSize, SingleListItemType } from "@/constants/globalConstants";
import { globalStyleDefinitions } from "@/constants/globalStyleDefinitions";
import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

type ListCardProps = {
  item: SingleListItemType;
  status: 'strength' | 'weakness'
}

const ListCard = ({ item, status }: ListCardProps) => {
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
                status == 'strength' ? theme.colors.primary : theme.colors.secondary,
            },
          ]}
        >
          {item?.title}
        </Text>
        <BottomText
          text={item?.description}
          textStyle={globalStyleDefinitions.mt_4}
        />
      </View>
      <CountWithStatus
        title={item?.value}
        status={status == 'strength' ? 1 : 0}
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
