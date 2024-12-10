import { colors } from "@/constants/colors";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { DefaultTheme, PaperProvider } from "react-native-paper";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
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

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const theme = {
    ...DefaultTheme,
    colors: {
      ...colors,
    },
  };

  return (
    <PaperProvider theme={theme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name={"profile/index"} options={{ animation: "none" }} />
        <Stack.Screen name={"matches/index"} options={{ animation: "none" }} />
      </Stack>
    </PaperProvider>
  );
}
