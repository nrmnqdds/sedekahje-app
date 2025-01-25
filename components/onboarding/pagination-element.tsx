import { StyleSheet, View, useWindowDimensions } from "react-native";
import React, { useCallback } from "react";
import Animated, {
	Extrapolation,
	interpolate,
	interpolateColor,
	useAnimatedStyle,
} from "react-native-reanimated";

type Props = {
	length: number;
	x: Animated.SharedValue<number>;
};

const PaginationElement = ({ length, x }: Props) => {
	const { width: SCREEN_WIDTH } = useWindowDimensions();

	const PaginationComponent = useCallback(
		({ index }: { index: number }) => {
			const itemRnStyle = useAnimatedStyle(() => {
				const width = interpolate(
					x.value,
					[
						(index - 1) * SCREEN_WIDTH,
						index * SCREEN_WIDTH,
						(index + 1) * SCREEN_WIDTH,
					],
					[35, 16, 35],
					Extrapolation.CLAMP,
				);

				const bgColor = interpolateColor(
					x.value,
					[
						(index - 1) * SCREEN_WIDTH,
						index * SCREEN_WIDTH,
						(index + 1) * SCREEN_WIDTH,
					],
					["#D0D0D0", "#304FFE", "#D0D0D0"],
				);

				return {
					width,
					backgroundColor: bgColor,
				};
			}, [x]);
			return <Animated.View style={[styles.itemStyle, itemRnStyle]} />;
		},
		[x, SCREEN_WIDTH],
	);

	return (
		<View style={styles.container}>
			{Array.from({ length }).map((_, index) => {
				// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
				return <PaginationComponent index={index} key={index} />;
			})}
		</View>
	);
};

export default PaginationElement;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	itemStyle: {
		width: 35,
		height: 10,
		borderRadius: 5,

		marginHorizontal: 5,
	},
});
