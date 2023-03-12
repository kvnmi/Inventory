import { Dimensions, PixelRatio } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const widthBaseScale = SCREEN_WIDTH / 375;
const heightBaseScale = SCREEN_HEIGHT / 812;

type Dimension = "WIDTH" | "HEIGHT";

const appTextNormalizer = (size: number, based: Dimension = "WIDTH") => {
  const newSize =
    based === "HEIGHT" ? size * heightBaseScale : size * widthBaseScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

const widthPixel = (size: number) => {
  return appTextNormalizer(size, "WIDTH");
};

const heightPixel = (size: number) => {
  return appTextNormalizer(size, "HEIGHT");
};

const fontPixel = (size: number) => {
  return appTextNormalizer(size);
};

const pixelSizeVertical = (size: number) => {
  return appTextNormalizer(size);
};

const pixelSizeHorizontal = (size: number) => {
  return appTextNormalizer(size);
};

const normalise = (size: number) => {
  return appTextNormalizer(size);
};

export {
  widthPixel,
  heightPixel,
  fontPixel,
  pixelSizeVertical,
  pixelSizeHorizontal,
  normalise,
};
