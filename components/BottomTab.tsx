import { fonts } from "@/constants/fonts";
import { getScaledFontSize, windowWidth } from "@/constants/globalConstants";
import imagePath from "@/constants/imagePath";
import { router } from "expo-router";
import React, { memo } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

const BottomTab = ({ screen }: { screen: string }) => {
  const theme = useTheme();
  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.backdrop }]}
    >
      <TouchableOpacity
        style={styles.btnContainer}
        activeOpacity={0.9}
        onPress={() => {
          if (screen !== "profile") {
            router.push("/profile");
          }
        }}
      >
        <Image
          source={imagePath.profile}
          style={[
            styles.image,
            {
              tintColor:
                screen == "profile"
                  ? theme.colors.primary
                  : theme.colors.onSurface,
            },
          ]}
        />
        <Text
          style={[
            styles.text,
            {
              color:
                screen == "profile"
                  ? theme.colors.primary
                  : theme.colors.onSurface,
            },
          ]}
        >
          Profile
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnContainer}
        activeOpacity={0.9}
        onPress={() => {
          if (screen !== "matches") {
            router.push("/matches");
          }
        }}
      >
        <Image
          source={imagePath.matches}
          style={[
            styles.image,
            {
              tintColor:
                screen == "matches"
                  ? theme.colors.primary
                  : theme.colors.onSurface,
            },
          ]}
        />
        <Text
          style={[
            styles.text,
            {
              color:
                screen == "matches"
                  ? theme.colors.primary
                  : theme.colors.onSurface,
            },
          ]}
        >
          Matches
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: 80,
    width: windowWidth,
    opacity: 0.9,
  },
  btnContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
  image: {
    height: 24,
    width: 24,
    resizeMode: "contain",
  },
  text: {
    bottom: -5,
    fontFamily: fonts.sansRegular,
    fontSize: getScaledFontSize(10),
  },
});

export default memo(BottomTab);
