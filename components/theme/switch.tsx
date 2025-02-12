import { colors } from "@/constants/colors";
import type { Theme } from "@/types/theme.types";
import { useEffect } from "react";
import { Pressable, StyleSheet, useWindowDimensions } from "react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from "react-native-reanimated";

type Props = {
	setTheme: (theme: Theme) => void;
	isDarkMode: boolean;
	themeSwitch: string;
};

const Switch = ({ setTheme, isDarkMode, themeSwitch }: Props) => {
	const { width } = useWindowDimensions();
	const translateX = useSharedValue(0);
	const SWITCH_CONTAINER_WIDTH = width * 0.8;
	const SWITCH_WIDTH = SWITCH_CONTAINER_WIDTH / 3;

	const translateAnimation = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: translateX.value }],
		};
	});

	useEffect(() => {
		if (themeSwitch === "system") {
			translateX.value = withSpring(SWITCH_WIDTH * 0);
		} else if (themeSwitch === "light") {
			translateX.value = withSpring(SWITCH_WIDTH * 1);
		} else if (themeSwitch === "dark") {
			translateX.value = withSpring(SWITCH_WIDTH * 2);
		}
	}, [SWITCH_WIDTH, themeSwitch, translateX]);

	const backgroundColorAnimation = useAnimatedStyle(() => {
		return {
			backgroundColor: isDarkMode
				? withTiming(colors.neutral[950])
				: withTiming(colors.neutral[200]),
		};
	});

	const textColorAnimation = useAnimatedStyle(() => {
		return {
			color: isDarkMode
				? withTiming(colors.neutral[50])
				: withTiming(colors.neutral[950]),
		};
	});

	const backgroundColorSlideAnimation = useAnimatedStyle(() => {
		return {
			backgroundColor: isDarkMode
				? withTiming(colors.neutral[900])
				: withTiming(colors.neutral[100]),
		};
	});

	return (
		<Animated.View
			style={[
				styles.container,
				{
					width: SWITCH_CONTAINER_WIDTH,
				},
				backgroundColorAnimation,
			]}
		>
			<Animated.View
				style={[
					styles.slideContainer,
					{
						width: SWITCH_WIDTH,
					},
					translateAnimation,
				]}
			>
				<Animated.View
					style={[
						styles.slide,
						{
							width: (width * 0.7) / 3,
						},
						backgroundColorSlideAnimation,
					]}
				/>
			</Animated.View>
			<Pressable
				style={styles.button}
				onPress={() => {
					setTheme("system");
				}}
			>
				<Animated.Text style={[styles.textButton, textColorAnimation]}>
					System
				</Animated.Text>
			</Pressable>
			<Pressable
				style={styles.button}
				onPress={() => {
					setTheme("light");
				}}
			>
				<Animated.Text style={[styles.textButton, textColorAnimation]}>
					Light
				</Animated.Text>
			</Pressable>
			<Pressable
				style={styles.button}
				onPress={() => {
					setTheme("dark");
				}}
			>
				<Animated.Text style={[styles.textButton, textColorAnimation]}>
					Dark
				</Animated.Text>
			</Pressable>
		</Animated.View>
	);
};

export default Switch;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#f0f0f0",
		flexDirection: "row",
		justifyContent: "space-evenly",
		alignItems: "center",
		borderRadius: 40,
		overflow: "hidden",
		marginTop: 20,
	},
	button: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
	},
	textButton: {
		color: "black",
		fontWeight: "500",
	},
	slideContainer: {
		...StyleSheet.absoluteFillObject,
		alignItems: "center",
		justifyContent: "center",
	},
	slide: {
		padding: 23,
		borderRadius: 100,
		backgroundColor: "white",
	},
});
