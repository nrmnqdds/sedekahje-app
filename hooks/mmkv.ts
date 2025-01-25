import type { StateStorage } from "zustand/middleware";
import type { MMKV } from "react-native-mmkv";

export const createMMKV = (mmkvInstance: MMKV) => {
	const mmkvStorage: StateStorage = {
		setItem: (name, value) => {
			return mmkvInstance.set(name, value);
		},
		getItem: (name) => {
			const value = mmkvInstance.getString(name);
			return value ?? null;
		},
		removeItem: (name) => {
			return mmkvInstance.delete(name);
		},
	};

	return mmkvStorage;
};
