import BottomSheet, {
	type BottomSheetMethods,
} from "@/components/theme/bottom-sheet";
import Button from "@/components/theme/button";
import { colors } from "@/constants/colors";
import { useTheme } from "@/hooks/use-theme";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as Application from "expo-application";
import { Tabs, router } from "expo-router";
import { useRef } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
	useAnimatedStyle,
	withTiming,
} from "react-native-reanimated";

export default function SettingScreen() {
	const { isDarkMode, setTheme, theme } = useTheme();

	const styles = !isDarkMode ? lightStyle : darkStyle;

	const backgroundColorAnimation = useAnimatedStyle(() => {
		return {
			backgroundColor: isDarkMode
				? withTiming(colors.neutral[950])
				: withTiming(colors.neutral[50]),
		};
	});

	const bottomSheetRef = useRef<BottomSheetMethods>(null);

	return (
		<Animated.ScrollView
			overScrollMode="never"
			bounces={false}
			alwaysBounceVertical={false}
			contentContainerStyle={[styles.background, backgroundColorAnimation]}
		>
			<Tabs.Screen
				options={{
					headerTintColor: isDarkMode
						? colors.neutral[50]
						: colors.neutral[900],
					headerStyle: {
						backgroundColor: isDarkMode
							? colors.neutral[950]
							: colors.neutral[50],
					},
				}}
			/>
			<View
				style={{
					gap: 5,
				}}
			>
				<Button bottomSheetRef={bottomSheetRef} isDarkMode={isDarkMode} />
				<Pressable
					style={styles.container}
					onPress={() => router.push("/(app)/(stack)/faq")}
				>
					<FontAwesome
						name="question"
						size={24}
						color={isDarkMode ? colors.neutral[50] : colors.neutral[900]}
					/>
					<Text
						style={[
							styles.text,
							{
								fontSize: 16,
								fontWeight: "500",
							},
						]}
					>
						FAQ
					</Text>
				</Pressable>
				<View
					style={{
						alignItems: "center",
					}}
				>
					<Text style={styles.text}>
						SedekahJe v{Application.nativeApplicationVersion} &copy;{" "}
						{new Date().getFullYear()} DevTalk MY
					</Text>
				</View>
			</View>
			<BottomSheet
				ref={bottomSheetRef}
				setTheme={setTheme}
				isDarkMode={isDarkMode}
				themeSwitch={theme}
			/>
		</Animated.ScrollView>
	);
}

const lightStyle = StyleSheet.create({
	background: {
		flex: 1,
		backgroundColor: colors.neutral[50],
		paddingVertical: 20,
		paddingHorizontal: 14,
	},
	container: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 20,
		backgroundColor: colors.neutral[100],
		borderRadius: 20,
	},
	text: {
		color: colors.black,
	},
});

const darkStyle = StyleSheet.create({
	background: {
		flex: 1,
		backgroundColor: colors.neutral[950],
		paddingVertical: 20,
		paddingHorizontal: 14,
	},
	container: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 20,
		backgroundColor: colors.neutral[900],
		borderRadius: 20,
	},
	text: {
		color: colors.neutral[50],
	},
});
