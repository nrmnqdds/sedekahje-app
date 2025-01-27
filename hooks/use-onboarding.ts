import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { MMKV } from "react-native-mmkv";
import { createMMKV } from "./mmkv";

const storeName = "onboarding-store";

const mmkv = new MMKV({
	id: storeName,
});

const mmkvStorage = createMMKV(mmkv);

interface OnboardingStore {
	isOnboarded: boolean;
	setOnboarded: (onboarded: boolean) => void;
}

export const useOnboarding = create(
	persist<OnboardingStore>(
		(set) => ({
			isOnboarded: false,
			setOnboarded: (newOnboarded) => {
				set({
					isOnboarded: newOnboarded,
				});
			},
		}),
		{
			name: storeName,
			storage: createJSONStorage(() => mmkvStorage),
		},
	),
);
