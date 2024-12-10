import * as Font from "expo-font";

export const useFonts = async () =>
  await Font.loadAsync({
    sansBold: require("../assets/fonts/PublicSans-Bold.ttf"),
    sansSemiBold: require("../assets/fonts/PublicSans-SemiBold.ttf"),
    sansMedium: require("../assets/fonts/PublicSans-Medium.ttf"),
    sansRegular: require("../assets/fonts/PublicSans-Regular.ttf"),
    sansLight: require("../assets/fonts/PublicSans-Light.ttf"),
    unboundedBold: require("../assets/fonts/Unbounded-Bold.ttf"),
    unboundedMedium: require("../assets/fonts/Unbounded-Medium.ttf"),
    unboundedRegular: require("../assets/fonts/Unbounded-Regular.ttf"),
    unboundedLight: require("../assets/fonts/Unbounded-Light.ttf"),
  });

export const fonts = {
  sansBold: "sansBold",
  sansSemiBold: "sansSemiBold",
  sansMedium: "sansMedium",
  sansRegular: "sansRegular",
  sansLight: "sansLight",
  unboundedBold: "unboundedBold",
  unboundedMedium: "unboundedMedium",
  unboundedRegular: "unboundedRegular",
  unboundedLight: "unboundedLight",
};
