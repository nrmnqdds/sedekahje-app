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
import Animated, {
	FadeIn,
	FadeOut,
	LinearTransition,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedIcon = Animated.createAnimatedComponent(Feather);
const damping = 10;
const enteringAnimation = FadeIn.springify().damping(damping);
const exitingAnimation = FadeOut.springify().damping(damping);
const borderRadius = 24;
const layout = LinearTransition.springify().damping(damping);

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
				<AnimatedPressable
					layout={layout}
					style={[
						styles.item,
						{
							borderTopLeftRadius: borderRadius,
							borderTopRightRadius: borderRadius,
							borderTopWidth: 1,
							borderRightWidth: 1,
							borderLeftWidth: 1,
						},
					]}
					onPress={() => setTheme("system")}
				>
					<View style={styles.titleContainer}>
						<Text style={styles.title}>System Default</Text>
						{theme === "system" && (
							<AnimatedIcon
								name={"check"}
								size={20}
								color={isDarkMode ? colors.neutral[50] : colors.neutral[900]}
								exiting={exitingAnimation}
								entering={enteringAnimation}
								layout={layout}
							/>
						)}
					</View>
				</AnimatedPressable>
				<AnimatedPressable
					layout={layout}
					style={[
						styles.item,
						{
							borderWidth: 1,
							borderTopColor: isDarkMode
								? colors.neutral[800]
								: colors.neutral[200],
							borderBottomColor: isDarkMode
								? colors.neutral[800]
								: colors.neutral[200],
						},
					]}
					onPress={() => setTheme("light")}
				>
					<View style={styles.titleContainer}>
						<Text style={styles.title}>Light Mode</Text>
						{theme === "light" && (
							<AnimatedIcon
								name={"check"}
								size={20}
								color={isDarkMode ? colors.neutral[50] : colors.neutral[900]}
								exiting={exitingAnimation}
								entering={enteringAnimation}
								layout={layout}
							/>
						)}
					</View>
				</AnimatedPressable>
				<AnimatedPressable
					layout={layout}
					style={[
						styles.item,
						{
							borderBottomRightRadius: borderRadius,
							borderBottomLeftRadius: borderRadius,
							borderBottomWidth: 1,
							borderRightWidth: 1,
							borderLeftWidth: 1,
						},
					]}
					onPress={() => setTheme("dark")}
				>
					<View style={styles.titleContainer}>
						<Text style={styles.title}>Dark Mode</Text>
						{theme === "dark" && (
							<AnimatedIcon
								name={"check"}
								size={20}
								color={isDarkMode ? colors.neutral[50] : colors.neutral[900]}
								exiting={exitingAnimation}
								entering={enteringAnimation}
								layout={layout}
							/>
						)}
					</View>
				</AnimatedPressable>
			</View>
			{/* </View> */}
		</SafeAreaView>
	);
}

const lightStyle = StyleSheet.create({
	background: {
		flex: 1,
		backgroundColor: colors.neutral[50],
		paddingVertical: 10,
		paddingHorizontal: 20,
	},
	item: {
		backgroundColor: colors.neutral[50],
		paddingHorizontal: 20,
		width: "100%",
		borderColor: colors.neutral[300],
	},
	titleContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		color: colors.neutral[900],
		paddingVertical: 16,
	},
	title: {
		fontSize: 18,
		fontWeight: "700",
		color: colors.neutral[900],
	},
});

const darkStyle = StyleSheet.create({
	background: {
		flex: 1,
		backgroundColor: colors.neutral[950],
		paddingVertical: 10,
		paddingHorizontal: 20,
	},
	item: {
		backgroundColor: colors.neutral[900],
		paddingHorizontal: 20,
		width: "100%",
		borderColor: colors.neutral[800],
		borderWidth: 1,
	},
	titleContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		color: colors.neutral[50],
		paddingVertical: 16,
	},
	title: {
		fontSize: 18,
		fontWeight: "700",
		color: colors.neutral[50],
	},
});
