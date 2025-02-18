import QrCodeDisplay from "@/components/shared/qrcode-display";
import { colors } from "@/constants/colors";
import { screenWidth } from "@/constants/size";
import { useInstitutions } from "@/hooks/use-institutions";
import { useTheme } from "@/hooks/use-theme";
import { LegendList } from "@legendapp/list";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import {
	ActivityIndicator,
	Image,
	RefreshControl,
	StyleSheet,
	Text,
	View,
} from "react-native";

export default function HomeScreen() {
	const { isDarkMode } = useTheme();
	const { institutions, lastFetched, fetchInstitutions, isFetching, isError } =
		useInstitutions();

	const [refreshing, setRefreshing] = useState(false);
	const [randomized, setRandomized] = useState(institutions);

	useEffect(() => {
		setRandomized([...institutions].sort(() => Math.random() - 0.5));
	}, [institutions]);

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		setRandomized([...institutions].sort(() => Math.random() - 0.5));
		setRefreshing(false);
	}, [institutions]);

	useQuery({
		queryKey: ["institutions"],
		queryFn: fetchInstitutions,
		enabled:
			!institutions ||
			institutions.length === 0 ||
			new Date().getTime() - new Date(lastFetched).getTime() >
				7 * 24 * 60 * 60 * 1000,
	});

	const styles = !isDarkMode ? lightStyle : darkStyle;

	return (
		<View style={styles.background}>
			{isFetching ? (
				<ActivityIndicator size="large" color={colors.cyan[500]} />
			) : isError ? (
				<Text>Failed to fetch data</Text>
			) : (
				<LegendList
					data={randomized}
					horizontal={false}
					keyExtractor={(item) => item.id.toString()}
					contentContainerStyle={{
						width: screenWidth,
					}}
					// numColumns={2}
					estimatedItemSize={30}
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={onRefresh}
							tintColor={colors.cyan[500]}
							colors={[colors.cyan[500]]}
						/>
					}
					renderItem={({ index, item }) => {
						return (
							<View
								key={index}
								style={{
									// width: screenWidth / 2 - 5,
									backgroundColor: colors.cyan[500],
									alignSelf: "center",
									borderRadius: 15,
									marginTop: 20,
								}}
							>
								{item.qrContent ? (
									<QrCodeDisplay
										qrContent={item.qrContent}
										supportedPayment={item.supportedPayment}
									/>
								) : (
									<Image
										source={{ uri: item.qrImage }}
										style={{ width: 100, height: 100 }}
									/>
								)}
							</View>
						);
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
