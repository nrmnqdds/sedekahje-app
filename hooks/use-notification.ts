import { MMKV } from "react-native-mmkv";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createMMKV } from "./mmkv";

const storeName = "notification-store";

const mmkv = new MMKV({
	id: storeName,
});

const mmkvStorage = createMMKV(mmkv);

interface NotificationStore {
	showNotification: boolean;
	notificationIdentifier: string | null;
	toggleShowNotification: () => void;
	setNotificationIdentifier: (identifier: string) => void;
}

export const useNotification = create(
	persist<NotificationStore>(
		(set, get) => ({
			showNotification: true, // Enabled by default
			toggleShowNotification: () => {
				set({
					showNotification: !get().showNotification,
				});
			},
			notificationIdentifier: null,
			setNotificationIdentifier: (identifier) => {
				set({
					notificationIdentifier: identifier,
				});
			},
		}),
		{
			name: storeName,
			storage: createJSONStorage(() => mmkvStorage),
		},
	),
);
