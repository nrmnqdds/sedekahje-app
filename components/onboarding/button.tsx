import { Pressable, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useCallback } from "react";
import Animated, {
	type SharedValue,
	useAnimatedStyle,
	withSpring,
	withTiming,
} from "react-native-reanimated";
import { useOnboarding } from "@/hooks/use-onboarding";
import { router } from "expo-router";

type Props = {
	currentIndex: SharedValue<number>;
	length: number;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	flatListRef: any;
};
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Button = ({ currentIndex, length, flatListRef }: Props) => {
	const { setOnboarded } = useOnboarding();

	const rnBtnStyle = useAnimatedStyle(() => {
		return {
			width:
				currentIndex.value === length - 1 ? withSpring(140) : withSpring(60),
			height: 60,
		};
	}, [currentIndex, length]);

	const rnTextStyle = useAnimatedStyle(() => {
		return {
			opacity:
				currentIndex.value === length - 1 ? withTiming(1) : withTiming(0),
			transform: [
				{
					translateX:
						currentIndex.value === length - 1 ? withTiming(0) : withTiming(100),
				},
			],
		};
	}, [currentIndex, length]);

	const imageAnimatedStyle = useAnimatedStyle(() => {
		return {
			opacity:
				currentIndex.value !== length - 1 ? withTiming(1) : withTiming(0),
			transform: [
				{
					translateX:
						currentIndex.value !== length - 1 ? withTiming(0) : withTiming(100),
				},
			],
		};
	}, [currentIndex, length]);

	const onPress = useCallback(() => {
		if (currentIndex.value === length - 1) {
			console.log("Get Started");

			setOnboarded(true);
			router.replace("/(app)/(tabs)");
			return;
		}
		flatListRef?.current?.scrollToIndex({
			index: currentIndex.value + 1,
		});
	}, [
		length,
		flatListRef?.current?.scrollToIndex,
		currentIndex.value,
		setOnboarded,
	]);
	return (
		<AnimatedPressable style={[styles.container, rnBtnStyle]} onPress={onPress}>
			<Animated.Text style={[styles.textStyle, rnTextStyle]}>
				Get Started
			</Animated.Text>
			<Animated.View style={[styles.imageStyle, imageAnimatedStyle]}>
				<AntDesign name="arrowright" size={24} color="white" />
			</Animated.View>
		</AnimatedPressable>
	);
};

export default Button;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		paddingHorizontal: 24,
		paddingVertical: 16,
		borderRadius: 100,
		backgroundColor: "#304FFE",
		alignItems: "center",
		justifyContent: "center",
		overflow: "hidden",
	},
	textStyle: {
		color: "white",
		position: "absolute",
		fontWeight: "600",
		fontSize: 16,
	},
	imageStyle: {
		width: 24,
		height: 24,
		position: "absolute",
	},
});
