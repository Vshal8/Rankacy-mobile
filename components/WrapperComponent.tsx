import React, { memo } from "react";
import { SafeAreaView } from "react-native";
import { useTheme } from "react-native-paper";

const WrapperContainer = ({ children }: any) => {
  const theme = useTheme();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.tertiary,
      }}
    >
      {children}
    </SafeAreaView>
  );
};

export default memo(WrapperContainer);
