import { ListItem } from "@/components/shared/list-item";
import { colors } from "@/constants/colors";
import { useTheme } from "@/hooks/use-theme";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
	ActivityIndicator,
	Dimensions,
	FlatList,
	StyleSheet,
	Text,
	View,
	type ViewToken,
} from "react-native";

import { useSharedValue } from "react-native-reanimated";

const data = new Array(200).fill(0).map((_, index) => ({ id: index }));

export default function HomeScreen() {
	const { isDarkMode } = useTheme();
	const { width: screenWidth } = Dimensions.get("screen");
	const query = useQuery({
		queryKey: ["institutions"],
		queryFn: async () => {
			const response = await fetch("https://sedekah.je/api/institutions");
			return await response.json();
		},
	});

	const styles = !isDarkMode ? lightStyle : darkStyle;

	const viewableItems = useSharedValue<ViewToken[]>([]);

	return (
		<View style={styles.background}>
			{query.isLoading ? (
				<ActivityIndicator size="large" color={colors.cyan[500]} />
			) : query.isError ? (
				<Text>Failed to fetch data</Text>
			) : (
				<FlatList
					data={query.data}
					horizontal={false}
					keyExtractor={(item) => item.id.toString()}
					contentContainerStyle={{
						paddingTop: 40,
						width: screenWidth,
					}}
					onViewableItemsChanged={({ viewableItems: vItems }) => {
						viewableItems.value = vItems;
					}}
					numColumns={2}
					columnWrapperStyle={{ justifyContent: "space-between" }} // causes items to be equally spaced
					renderItem={({ item }) => {
						return <ListItem item={item} viewableItems={viewableItems} />;
					}}
				/>
			)}
		</View>
	);
}

const lightStyle = StyleSheet.create({
	background: {
		flex: 1,
		backgroundColor: colors.neutral[50],
	},
});

const darkStyle = StyleSheet.create({
	background: {
		flex: 1,
		backgroundColor: colors.neutral[950],
	},
});
