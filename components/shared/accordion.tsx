import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useMemo, useState } from "react";
import Animated, {
	FadeInUp,
	FadeOutUp,
	LinearTransition,
	useAnimatedStyle,
	withSpring,
} from "react-native-reanimated";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useTheme } from "@/hooks/use-theme";
import { colors } from "@/constants/colors";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const damping = 10;
const enteringAnimation = FadeInUp.springify().damping(damping);
const exitingAnimation = FadeOutUp.springify().damping(damping);
const layout = LinearTransition.springify().damping(damping);

const AnimatedIcon = Animated.createAnimatedComponent(FontAwesome5);

const borderRadius = 24;

interface AccordionProps {
	title: string;
	description: string;
}

const CardSplittingAccordion = ({ data }: { data: Array<AccordionProps> }) => {
	const [index, setIndex] = useState(-1);

	return data.map((item, idx) => (
		<Item
			// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
			key={idx}
			item={item}
			itemLength={data.length}
			itemIndex={idx}
			selectedIndex={index}
			onPress={() => setIndex((p) => (p === idx ? -1 : idx))}
		/>
	));
};

export default CardSplittingAccordion;

type ItemProps = {
	item: AccordionProps;
	itemIndex: number;
	itemLength: number;
	selectedIndex: number;
	onPress: () => void;
};

const Item = ({
	item,
	itemIndex,
	itemLength,
	selectedIndex,
	onPress,
}: ItemProps) => {
	const isSelected = itemIndex === selectedIndex;

	const { isDarkMode } = useTheme();

	const styles = !isDarkMode ? lightStyle : darkStyle;

	const iconStyle = useAnimatedStyle(
		() => ({
			transform: [
				{ rotate: withSpring(isSelected ? "180deg" : "0deg", { damping }) },
			],
		}),
		[isSelected, itemIndex, selectedIndex],
	);

	const updatedStyles = useMemo(() => {
		const isTopItem = itemIndex === 0 || itemIndex === selectedIndex + 1;
		const isBottomItem =
			itemIndex === itemLength - 1 || itemIndex === selectedIndex - 1;
		return {
			borderTopWidth: isTopItem ? 1 : 0,
			borderBottomWidth: isBottomItem ? 1 : 0,
			borderTopLeftRadius: isTopItem ? borderRadius : 0,
			borderTopRightRadius: isTopItem ? borderRadius : 0,
			borderBottomLeftRadius: isBottomItem ? borderRadius : 0,
			borderBottomRightRadius: isBottomItem ? borderRadius : 0,
		};
	}, [itemIndex, selectedIndex, itemLength]);

	return (
		<AnimatedPressable
			layout={layout}
			style={[styles.item, isSelected ? styles.itemSelected : updatedStyles]}
			onPress={onPress}
		>
			<View style={styles.titleContainer}>
				<View style={styles.iconContainer}>
					{/* {item.icon} */}
					<Text style={styles.title}>{item.title}</Text>
				</View>
				<AnimatedIcon
					// @ts-ignore
					name={"chevron-up"}
					size={20}
					color="#8F8F9A"
					style={iconStyle}
				/>
			</View>
			{isSelected && (
				<Animated.View
					exiting={exitingAnimation}
					entering={enteringAnimation}
					layout={layout}
					style={{ paddingBottom: 16 }}
				>
					<Text style={styles.description}>{item.description}</Text>
				</Animated.View>
			)}
		</AnimatedPressable>
	);
};

const lightStyle = StyleSheet.create({
	item: {
		backgroundColor: "#FEFEFE",
		paddingHorizontal: 20,
		width: "100%",
		borderColor: "#B7B6BC",
		borderWidth: 1,
	},
	itemSelected: {
		borderWidth: 1,
		backgroundColor: "#FBFBFD",
		marginVertical: 10,
		borderRadius,
		borderColor: "#B7B6BC",
	},
	titleContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		color: "#2B2B2B",
		paddingVertical: 16,
	},
	iconContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		flex: 1,
	},
	title: {
		fontSize: 18,
		fontWeight: "700",
		color: "#2D2D30",
	},
	description: {
		fontSize: 16,
		color: "#59595D",
	},
});

const darkStyle = StyleSheet.create({
	item: {
		backgroundColor: colors.neutral[900],
		paddingHorizontal: 20,
		width: "100%",
		borderColor: colors.neutral[800],
		borderWidth: 1,
	},
	itemSelected: {
		borderWidth: 1,
		backgroundColor: colors.neutral[800],
		marginVertical: 10,
		borderRadius,
		borderColor: colors.neutral[700],
	},
	titleContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		color: colors.neutral[50],
		paddingVertical: 16,
	},
	iconContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	title: {
		fontSize: 18,
		fontWeight: "700",
		color: colors.neutral[50],
	},
	description: {
		fontSize: 16,
		color: colors.neutral[200],
	},
});
