import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { MMKV } from "react-native-mmkv";
import { createMMKV } from "./mmkv";
import { Appearance, type ColorSchemeName } from "react-native";

const storeName = "theme-store";

type Theme = NonNullable<ColorSchemeName> | "system";

const mmkv = new MMKV({
	id: storeName,
});

const mmkvStorage = createMMKV(mmkv);

interface ThemeStore {
	theme: Theme;
	isDarkMode: boolean;
	setTheme: (theme: Theme) => void;
}

export const useTheme = create(
	persist<ThemeStore>(
		(set) => ({
			theme: "system",
			isDarkMode: Appearance.getColorScheme() === "dark",
			setTheme: (newTheme) => {
				set({
					theme: newTheme,
          isDarkMode: newTheme === "dark" || (newTheme === "system" && Appearance.getColorScheme() === "dark"),
				});
			},
		}),
		{
			name: storeName,
			storage: createJSONStorage(() => mmkvStorage),
		},
	),
);

export default useTheme;
