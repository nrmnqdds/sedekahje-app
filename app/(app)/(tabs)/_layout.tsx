import { colors } from "@/constants/colors";
import { useTheme } from "@/hooks/use-theme";
import { OnboardingProvider } from "@/providers/onboarding-provider";
import Feather from "@expo/vector-icons/Feather";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const TabsLayout = () => {
	const { isDarkMode } = useTheme();

	return (
		<OnboardingProvider>
			<Tabs
				screenOptions={{
					tabBarStyle: {
						position: "absolute",
						// backgroundColor: isDarkMode
						// 	? colors.neutral[900]
						// 	: colors.neutral[50],
						// borderTopColor: isDarkMode
						// 	? colors.neutral[700]
						// 	: colors.neutral[200],
					},
					tabBarBackground: () => (
						<BlurView
							intensity={80}
							style={{
								...StyleSheet.absoluteFillObject,
								backgroundColor: "transparent",
								overflow: "hidden",
							}}
						/>
					),
					headerTintColor: isDarkMode
						? colors.neutral[50]
						: colors.neutral[900],
					headerStyle: {
						backgroundColor: isDarkMode
							? colors.neutral[950]
							: colors.neutral[50],
					},
				}}
			>
				<Tabs.Screen
					name="index"
					options={{
						title: "Home",
						tabBarIcon: ({ color }) => (
							<Feather name="home" size={24} color={color} />
						),
						tabBarShowLabel: false,
					}}
				/>
				<Tabs.Screen
					name="settings"
					options={{
						title: "Settings",
						tabBarIcon: ({ color }) => (
							<Feather name="settings" size={24} color={color} />
						),
						tabBarShowLabel: false,
					}}
				/>
			</Tabs>
		</OnboardingProvider>
	);
};

export default TabsLayout;
