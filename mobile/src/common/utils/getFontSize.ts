import { Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

export const getFontSize = (size: number) => {
    const baseWidth = 375; // The width on which you designed your app
    const scale = width / baseWidth;
    return Math.round(size * scale);
};