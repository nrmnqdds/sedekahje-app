import React from "react";
import { ScrollView, View, Text, StyleSheet, Pressable } from "react-native";
import { useTheme } from "@/hooks/use-theme";
import { router, Tabs } from "expo-router";
import * as Application from "expo-application";
import { colors } from "@/constants/colors";
import Feather from "@expo/vector-icons/Feather";

export default function SettingScreen() {
	const { isDarkMode } = useTheme();

	const styles = !isDarkMode ? lightStyle : darkStyle;

	return (
		<ScrollView
			overScrollMode="never"
			bounces={false}
			alwaysBounceVertical={false}
			contentContainerStyle={styles.background}
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
			<View style={styles.container}>
				<Pressable
					style={[
						styles.row,
						{
							borderBottomWidth: 1,
							borderBottomColor: isDarkMode
								? colors.neutral[800]
								: colors.neutral[200],
						},
					]}
					onPress={() => router.push("/(app)/(stack)/appearance")}
				>
					<Text style={styles.text}>Appearance</Text>
					<Feather
						name="arrow-right"
						size={24}
						color={isDarkMode ? colors.neutral[50] : colors.neutral[900]}
					/>
				</Pressable>
				<Pressable
					style={styles.row}
					onPress={() => router.push("/(app)/(stack)/faq")}
				>
					<Text style={styles.text}>FAQ</Text>
					<Feather
						name="arrow-right"
						size={24}
						color={isDarkMode ? colors.neutral[50] : colors.neutral[900]}
					/>
				</Pressable>
			</View>
			<Text style={styles.text}>
				SedekahJe v{Application.nativeApplicationVersion} &copy;{" "}
				{new Date().getFullYear()} DevTalk MY
			</Text>
		</ScrollView>
	);
}

const lightStyle = StyleSheet.create({
	background: {
		flex: 1,
		backgroundColor: colors.neutral[50],
		paddingVertical: 20,
		paddingHorizontal: 14,
	},
	row: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 10,
	},
	container: {
		backgroundColor: colors.neutral[100],
		borderRadius: 10,
	},
	text: {
		color: colors.black,
	},
});

const darkStyle = StyleSheet.create({
	background: {
		flex: 1,
		backgroundColor: colors.neutral[950],
		paddingVertical: 10,
		paddingHorizontal: 14,
	},
	row: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 10,
	},
	container: {
		backgroundColor: colors.neutral[900],
		borderRadius: 10,
	},
	text: {
		color: colors.neutral[50],
	},
});
