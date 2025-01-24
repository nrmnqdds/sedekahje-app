import { create } from "zustand";
import {
	createJSONStorage,
	persist,
	type StateStorage,
} from "zustand/middleware";
import { MMKV } from "react-native-mmkv";

const storeName = "notification-store";

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
