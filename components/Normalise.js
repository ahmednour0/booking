import { Dimensions, Platform, PixelRatio } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const BASE_WIDTH = 360; // Reference screen width for scaling
const scale = SCREEN_WIDTH / BASE_WIDTH;

export function pixelNormalize(size) {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}
