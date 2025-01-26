import { Stack } from "expo-router";
import { useTheme } from "@/hooks/use-theme";

export default function StackLayout() {
	const { isDarkMode } = useTheme();

	return (
		<Stack
			screenOptions={{
				headerBlurEffect: isDarkMode ? "dark" : "light",
				headerTransparent: true,
			}}
		/>
	);
}
