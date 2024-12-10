import { Dimensions, PixelRatio } from "react-native";

export const windowHeight: number = Dimensions.get("window").height;
export const windowWidth: number = Dimensions.get("window").width;

export function getScaledFontSize(size: any) {
  return size / PixelRatio.getFontScale();
}

export const getRoundedValue=(val:number)=>{
  return Math.round(val)
}