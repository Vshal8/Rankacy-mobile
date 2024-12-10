import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";

const ProgressBar = ({
  val,
  avg,
  width,
  status,
}: {
  val: number;
  avg: number;
  width?: number;
  status: number;
}) => {
  const theme = useTheme();
  return (
    <View>
      <View
        style={[
          styles.progressBarContainer,
          { width: width, backgroundColor: theme.colors.onSurface },
        ]}
      >
        <View
          style={[
            styles.progressBar,
            {
              width: `${val}%`,
              backgroundColor:
                status == 1 ? theme.colors.primary : theme.colors.secondary,
            },
          ]}
        ></View>
      </View>
      <View
        style={[
          styles.verticalLine,
          { left: `${avg}%`, backgroundColor: theme.colors.surface },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarContainer: {
    height: 6,
    borderRadius: 3,
    marginTop: 8,
    overflow: "hidden",
    width: "100%",
  },
  progressBar: {
    height: "100%",
  },
  verticalLine: {
    position: "absolute",
    height: 10,
    width: 2,
    bottom: -2,
  },
});

export default memo(ProgressBar);
