import { create } from "zustand";
import {
	createJSONStorage,
	persist,
	type StateStorage,
} from "zustand/middleware";
import { MMKV } from "react-native-mmkv";

const storeName = "theme-store";

type Theme = "light" | "dark" | "system";

const mmkv = new MMKV({
	id: storeName,
});

const mmkvStorage: StateStorage = {
	setItem: (name, value) => {
		return mmkv.set(name, value);
	},
	getItem: (name) => {
		const value = mmkv.getString(name);
		return value ?? null;
	},
	removeItem: (name) => {
		return mmkv.delete(name);
	},
};

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
