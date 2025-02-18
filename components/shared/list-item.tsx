import type { IInstitution } from "@/types/institutions.types";
import { memo } from "react";
import { Dimensions, StyleSheet, Text, type ViewToken } from "react-native";
import Animated, {
	useAnimatedStyle,
	withTiming,
	type SharedValue,
} from "react-native-reanimated";

type ListItemProps = {
	viewableItems: SharedValue<ViewToken[]>;
	item: IInstitution;
};

const ListItem = memo<ListItemProps>(({ item, viewableItems }) => {
	const rStyle = useAnimatedStyle(() => {
		const isVisible = Boolean(
			viewableItems.value
				.filter((item) => item.isViewable)
				.find((viewableItem) => viewableItem.item.id === item.id),
		);

		return {
			opacity: withTiming(isVisible ? 1 : 0),
			transform: [
				{
					scale: withTiming(isVisible ? 1 : 0.6),
				},
			],
		};
	}, []);

	const { width: screenWidth } = Dimensions.get("screen");

	return (
		<Animated.View
			style={[styles.listItem, rStyle, { width: screenWidth / 2 - 5 }]}
		>
			<Text>{item.name}</Text>
		</Animated.View>
	);
});

const styles = StyleSheet.create({
	listItem: {
		height: 80,
		backgroundColor: "#78CAD2",
		alignSelf: "center",
		borderRadius: 15,
		marginTop: 20,
	},
});

export { ListItem };
