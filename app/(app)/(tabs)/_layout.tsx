import { colors } from "@/constants/colors";
import { useTheme } from "@/hooks/use-theme";
import Feather from "@expo/vector-icons/Feather";
import { Tabs } from "expo-router";
import React from "react";

const AppLayout = () => {
	const { isDarkMode } = useTheme();

	return (
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
				name="home"
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
	);
};

export default AppLayout;
