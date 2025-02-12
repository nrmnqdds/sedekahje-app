import { colors } from "@/constants/colors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import Animated, {
	useAnimatedStyle,
	withTiming,
} from "react-native-reanimated";
import type { BottomSheetMethods } from "./bottom-sheet";

type Props = {
	bottomSheetRef: React.RefObject<BottomSheetMethods>;
	isDarkMode: boolean;
};

const Button = ({ bottomSheetRef, isDarkMode }: Props) => {
	const backgroundColorAnimation = useAnimatedStyle(() => {
		return {
			backgroundColor: isDarkMode
				? withTiming(colors.neutral[900])
				: withTiming(colors.neutral[100]),
		};
	});

	const textColorAnimation = useAnimatedStyle(() => {
		return {
			color: isDarkMode
				? withTiming(colors.neutral[50])
				: withTiming(colors.neutral[900]),
		};
	});

	return (
		<TouchableWithoutFeedback
			onPress={() => {
				bottomSheetRef.current?.expand();
			}}
		>
			<Animated.View style={[styles.container, backgroundColorAnimation]}>
				<MaterialCommunityIcons
					name="theme-light-dark"
					size={24}
					color={isDarkMode ? colors.neutral[50] : colors.neutral[900]}
				/>
				<Animated.Text style={[styles.text, textColorAnimation]}>
					Change Theme
				</Animated.Text>
			</Animated.View>
		</TouchableWithoutFeedback>
	);
};

export default Button;

const styles = StyleSheet.create({
	container: {
		padding: 20,
		borderRadius: 20,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	text: {
		fontSize: 16,
		fontWeight: "500",
	},
});
