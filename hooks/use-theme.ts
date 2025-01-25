import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { MMKV } from "react-native-mmkv";
import { createMMKV } from "./mmkv";

const storeName = "theme-store";

type Theme = "light" | "dark" | "system";

const mmkv = new MMKV({
	id: storeName,
});

const mmkvStorage = createMMKV(mmkv);

interface ThemeStore {
	theme: Theme;
	setTheme: (theme: Theme) => void;
	themeName: string;
}

export const useTheme = create(
	persist<ThemeStore>(
		(set) => ({
			theme: "system",
			setTheme: (newTheme) => {
				set({
					theme: newTheme,
					themeName:
						newTheme === "system"
							? "System Default"
							: newTheme.charAt(0).toUpperCase() + newTheme.slice(1),
				});
			},
			themeName: "System Default",
		}),
		{
			name: storeName,
			storage: createJSONStorage(() => mmkvStorage),
		},
	),
);

export default useTheme;
