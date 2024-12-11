import { fonts } from "@/constants/fonts";
import { getScaledFontSize, windowWidth } from "@/constants/globalConstants";
import { globalStyleDefinitions } from "@/constants/globalStyleDefinitions";
import React, { memo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Modal, Text, useTheme } from "react-native-paper";
import Feather from "react-native-vector-icons/Feather";

const TimeRangeSheet = ({
  onSelect,
  visible,
  onClose,
  selectedRange,
}: {
  onSelect: (match: string) => void;
  visible: boolean;
  onClose: () => void;
  selectedRange: string;
}) => {
  const timeRanges = ["last 15 games", "last month", "alltime"];
  const theme = useTheme();
  return (
    <Modal
      visible={visible}
      dismissable={true}
      dismissableBackButton={true}
      onDismiss={onClose}
      style={[styles.mainContainer, { backgroundColor: theme.colors.shadow }]}
    >
      <View
        style={[
          styles.subContainer,
          {
            backgroundColor: theme.colors.background,
            borderColor: theme.colors.outlineVariant,
          },
        ]}
      >
        <Text style={[styles.headerText, { color: theme.colors.surface }]}>
          Time range
        </Text>
        <View
          style={[
            styles.wrapperContainer,
            { backgroundColor: theme.colors.inverseSurface },
          ]}
        >
          {timeRanges.map((range, index) => (
            <TouchableOpacity
              key={range}
              onPress={() => onSelect(range)}
              style={styles.btnContainer}
            >
              <Text style={[styles.btnText, { color: theme.colors.surface }]}>
                {range}
              </Text>
              {selectedRange == range && (
                <Feather
                  name="check"
                  color={theme.colors.primary}
                  size={24}
                  style={styles.icon}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1,
  },
  subContainer: {
    borderWidth: 1,
    width: windowWidth,
    paddingBottom: 100,
    borderTopLeftRadius: globalStyleDefinitions.br_22.borderRadius,
    borderTopRightRadius: globalStyleDefinitions.br_22.borderRadius,
    padding: globalStyleDefinitions.screenPadding.padding,
  },
  headerText: {
    fontFamily: fonts.sansBold,
    fontSize: getScaledFontSize(16),
  },
  wrapperContainer: {
    borderRadius: globalStyleDefinitions.br_16.borderRadius,
    padding: globalStyleDefinitions.screenPadding.padding,
    marginTop: globalStyleDefinitions.mt_16.marginTop,
  },
  btnContainer: { height: 40, alignItems: "center", flexDirection: "row" },
  btnText: {
    fontFamily: fonts.sansMedium,
    fontSize: getScaledFontSize(13),
  },
  icon: { position: "absolute", right: 0 },
});

export default memo(TimeRangeSheet);
