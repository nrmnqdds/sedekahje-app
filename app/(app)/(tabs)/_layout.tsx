import { colors } from "@/constants/colors";
import { useTheme } from "@/hooks/use-theme";
import { OnboardingProvider } from "@/providers/onboarding-provider";
import Feather from "@expo/vector-icons/Feather";
import { Tabs } from "expo-router";
import React from "react";

const TabsLayout = () => {
	const { isDarkMode } = useTheme();

	return (
		<OnboardingProvider>
			<Tabs
				screenOptions={{
					tabBarStyle: {
						backgroundColor: isDarkMode
							? colors.neutral[900]
							: colors.neutral[50],
						borderTopColor: isDarkMode
							? colors.neutral[700]
							: colors.neutral[200],
					},
				}}
			>
				<Tabs.Screen
					name="index"
					options={{
						headerShown: false,
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
