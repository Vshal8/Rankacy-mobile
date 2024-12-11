import { Dimensions, PixelRatio } from "react-native";

export const windowHeight: number = Dimensions.get("window").height;
export const windowWidth: number = Dimensions.get("window").width;

export function getScaledFontSize(size: any) {
  return size / PixelRatio.getFontScale();
}

export const getRoundedValue = (val: number) => {
  return Math.round(val)
}

export type SingleListItemType = {
  title: string;
  description: string;
  value: string;
}