import { useCallback } from "react";
import {
	type ImageURISource,
	SafeAreaView,
	StyleSheet,
	View,
	type ViewToken,
} from "react-native";
import Animated, {
	useAnimatedRef,
	useAnimatedScrollHandler,
	useSharedValue,
} from "react-native-reanimated";
import ListItem from "@/components/onboarding/list-item";
import PaginationElement from "@/components/onboarding/pagination-element";
import Button from "@/components/onboarding/button";

const pages = [
	{
		text: "Trusted By The Community in Malaysia",
		image: require("../assets/lottie/welcome.lottie"),
	},
	{
		text: "Looking for doing deed just by staying at home?",
		image: require("../assets/lottie/big-guy-question.lottie"),
	},
	{
		text: "Let's SedekahJe Today!",
		image: require("../assets/lottie/sedekah1.lottie"),
	},
];

export default function OnboardingScreen() {
	const x = useSharedValue(0);
	const flatListIndex = useSharedValue(0);
	const flatListRef =
		useAnimatedRef<
			Animated.FlatList<{
				text: string;
				image: ImageURISource;
			}>
		>();

	const onViewableItemsChanged = useCallback(
		({ viewableItems }: { viewableItems: ViewToken[] }) => {
			flatListIndex.value = viewableItems[0].index ?? 0;
		},
		[flatListIndex],
	);
	const scrollHandle = useAnimatedScrollHandler({
		onScroll: (event) => {
			x.value = event.contentOffset.x;
		},
	});

	const renderItem = useCallback(
		({
			item,
			index,
		}: {
			item: { text: string; image: string };
			index: number;
		}) => {
			return <ListItem item={item} index={index} x={x} />;
		},
		[x],
	);
	return (
		<SafeAreaView style={styles.container}>
			<Animated.FlatList
				ref={flatListRef}
				onScroll={scrollHandle}
				horizontal
				scrollEventThrottle={16}
				pagingEnabled={true}
				data={pages}
				keyExtractor={(_, index) => index.toString()}
				bounces={false}
				renderItem={renderItem}
				showsHorizontalScrollIndicator={false}
				onViewableItemsChanged={onViewableItemsChanged}
			/>
			<View style={styles.bottomContainer}>
				<PaginationElement length={pages.length} x={x} />
				<Button
					currentIndex={flatListIndex}
					length={pages.length}
					flatListRef={flatListRef}
				/>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	bottomContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 20,
	},
});
