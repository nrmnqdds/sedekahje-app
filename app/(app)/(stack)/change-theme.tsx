import {
	View,
	SafeAreaView,
	Text,
	StyleSheet,
	TouchableOpacity,
	Pressable,
} from "react-native";
import { useTheme } from "@/hooks/use-theme";
import { router, Stack } from "expo-router";
import { colors } from "@/constants/colors";
import Feather from "@expo/vector-icons/Feather";

export default function AppearanceSettings() {
	const { theme, setTheme, isDarkMode } = useTheme();

	const styles = !isDarkMode ? lightStyle : darkStyle;

	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: !isDarkMode ? colors.neutral[50] : colors.neutral[950],
			}}
		>
			<View style={styles.background}>
				<Stack.Screen
					options={{
						title: "Appearance",
						headerTintColor: !isDarkMode
							? colors.neutral[950]
							: colors.cyan[50],
						headerStyle: {
							backgroundColor: !isDarkMode
								? colors.neutral[50]
								: colors.neutral[950],
						},
						headerLeft: () => {
							return (
								<TouchableOpacity
									onPress={() => {
										router.back();
									}}
								>
									<Feather
										name="arrow-left"
										size={24}
										color={!isDarkMode ? colors.black : colors.neutral[50]}
									/>
								</TouchableOpacity>
							);
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
						onPress={() => setTheme("system")}
					>
						<Text style={styles.text}>System Default</Text>
						<Feather
							name="check"
							size={24}
							color={
								theme === "system"
									? isDarkMode
										? colors.neutral[50]
										: colors.neutral[900]
									: "transparent"
							}
						/>
					</Pressable>
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
						onPress={() => setTheme("light")}
					>
						<Text style={styles.text}>Light Mode</Text>
						<Feather
							name="check"
							size={24}
							color={theme === "light" ? colors.neutral[900] : "transparent"}
						/>
					</Pressable>
					<Pressable style={styles.row} onPress={() => setTheme("dark")}>
						<Text style={styles.text}>Dark Mode</Text>
						<Feather
							name="check"
							size={24}
							color={theme === "dark" ? colors.neutral[50] : "transparent"}
						/>
					</Pressable>
				</View>
			</View>
		</SafeAreaView>
	);
}

const lightStyle = StyleSheet.create({
	background: {
		flex: 1,
		backgroundColor: colors.neutral[50],
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
